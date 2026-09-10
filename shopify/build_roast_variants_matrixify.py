#!/usr/bin/env python3
"""
Dr. Evil's Coffee: Matrixify import that rebuilds LAB-001..LAB-006 as
Roast x Bag Size variants (catalog OPTION A, locked 2026-09-10).

    Option1  Roast     Low Voltage | Full Charge | Maximum Overdrive
    Option2  Bag Size  8 oz | 12 oz | 1 lb | 2 lbs
    = 12 variants per lot, 72 in total

    Variant SKU = LAB-00X-<ROAST>-<SIZE>, e.g. LAB-001-FC-12OZ
                  (Morris STYLE-COLOR-SIZE: lot / roast / bag)

Grind is NOT a variant. The legacy "Grind size" option (Pour Over / Espresso /
Whole Bean) is dropped. Grind rides as the "Grind" line-item property from
snippets/roast-grind-picker.liquid (8 grinds). That snippet turns itself on
per product as soon as "Grind size" is gone, so there's nothing to edit in the theme.

HOW THE IMPORT BEHAVES
  Command         = UPDATE   the product must already exist (matched by ID). It keeps
                             title, body, images, SEO, tags, handle and URL.
  Variant Command = REPLACE  deletes all 12 legacy variants and creates the 12 in
                             this file. Old variant IDs die: that breaks any open
                             carts, and any saved ?variant= links fall back to the default.
  Price depends on bag size only (the live prices are carried over). Roast is price-neutral.
  Weight is set to the NET coffee weight (the live value is 0, so weight-based shipping
  rates currently calculate as free). Add packaging tare with --tare-lb once a
  filled bag has been weighed.

BARCODES
  Left blank unless you pass --barcodes upc_map.csv (columns: SKU,UPC). UPC is
  the universal join key across RICS, so never invent one. Ways to run it:
    1. Import now without UPCs (it unblocks the storefront), then later run
       --barcodes-only to emit a small UPDATE file that sets just the barcodes.
    2. Or wait and import once with barcodes filled in.

USAGE
  python build_roast_variants_matrixify.py                       # from live_catalog_*.json
  python build_roast_variants_matrixify.py --fetch               # re-pull live prices first
  python build_roast_variants_matrixify.py --barcodes upc.csv    # fill Variant Barcode
  python build_roast_variants_matrixify.py --barcodes upc.csv --barcodes-only
  python build_roast_variants_matrixify.py --tare-lb 0.08

Always check the Matrixify preview before running the import. Run it on ONE product first
(--only LAB-001), check the storefront, then run the other five.
"""

import argparse
import csv
import glob
import json
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SHOP = "https://shop.drevil.coffee"

# Must match ROASTS[].optionValue in src/app/data/roastGrind.ts and the film supers.
ROASTS = [
    ("Low Voltage", "LV"),
    ("Full Charge", "FC"),
    ("Maximum Overdrive", "MO"),
]

# Must match BAG_SIZES[].optionValue in src/app/data/roastGrind.ts and the live
# Shopify option values verbatim ("2 lbs", not "2 lb").
BAG_SIZES = [
    # value,   sku suffix, net lb
    ("8 oz",  "8OZ",  0.50),
    ("12 oz", "12OZ", 0.75),
    ("1 lb",  "1LB",  1.00),
    ("2 lbs", "2LB",  2.00),
]

BASE_SKUS = [f"LAB-{i:03d}" for i in range(1, 7)]

COLUMNS = [
    "ID",
    "Handle",
    "Command",
    "Option1 Name",
    "Option1 Value",
    "Option2 Name",
    "Option2 Value",
    "Variant Command",
    "Variant Position",
    "Variant SKU",
    "Variant Barcode",
    "Variant Price",
    "Variant Compare At Price",
    "Variant Inventory Tracker",
    "Variant Inventory Policy",
    "Variant Fulfillment Service",
    "Variant Requires Shipping",
    "Variant Taxable",
    "Variant Weight",
    "Variant Weight Unit",
]

BARCODE_COLUMNS = ["ID", "Handle", "Command", "Variant Command", "Variant SKU", "Variant Barcode"]


def variant_sku(base: str, roast_suffix: str, size_suffix: str) -> str:
    return f"{base}-{roast_suffix}-{size_suffix}"


def load_snapshot(path=None):
    if path is None:
        found = sorted(glob.glob(os.path.join(HERE, "live_catalog_*.json")))
        if not found:
            sys.exit("ERROR: no live_catalog_*.json next to this script. Use --fetch.")
        path = found[-1]
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    print(f"  catalog: {os.path.basename(path)}")
    return data["products"]


def fetch_live(snapshot):
    """Refresh id/title/prices from the public product JSON (no token needed)."""
    out = []
    for p in snapshot:
        url = f"{SHOP}/products/{p['handle']}.json"
        with urllib.request.urlopen(url, timeout=20) as r:
            prod = json.load(r)["product"]
        opt_names = [o["name"] for o in prod["options"]]
        try:
            size_idx = opt_names.index("Bag Size")
        except ValueError:
            sys.exit(f"ERROR: {p['handle']} has no 'Bag Size' option (options: {opt_names}).")
        prices = {}
        for v in prod["variants"]:
            size = v[f"option{size_idx + 1}"]
            prev = prices.setdefault(size, v["price"])
            if prev != v["price"]:
                sys.exit(f"ERROR: {p['handle']} {size} has two prices ({prev} / {v['price']}). "
                         "Price must vary by bag size only. Fix it in Shopify first.")
        out.append({**p, "id": prod["id"], "title": prod["title"], "prices": prices})
        print(f"  fetched {p['base_sku']}: {prices}")
    return out


def load_barcodes(path):
    m = {}
    with open(path, newline="", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            sku = (r.get("SKU") or "").strip().upper()
            upc = (r.get("UPC") or "").strip()
            if not sku or not upc:
                continue
            if not upc.isdigit() or len(upc) not in (12, 13):
                sys.exit(f"ERROR: {sku}: UPC {upc!r} is not 12/13 digits.")
            if upc in m.values():
                sys.exit(f"ERROR: UPC {upc} assigned twice.")
            m[sku] = upc
    return m


def build_rows(products, barcodes, tare_lb):
    rows = []
    for p in products:
        missing = [s for s, _, _ in BAG_SIZES if s not in p["prices"]]
        if missing:
            sys.exit(f"ERROR: {p['base_sku']} has no live price for {missing}.")
        pos = 0
        for roast, r_suf in ROASTS:
            for size, s_suf, net_lb in BAG_SIZES:
                pos += 1
                sku = variant_sku(p["base_sku"], r_suf, s_suf)
                rows.append({
                    "ID": p["id"],
                    "Handle": p["handle"],
                    "Command": "UPDATE",
                    "Option1 Name": "Roast",
                    "Option1 Value": roast,
                    "Option2 Name": "Bag Size",
                    "Option2 Value": size,
                    "Variant Command": "REPLACE",
                    "Variant Position": pos,
                    "Variant SKU": sku,
                    "Variant Barcode": barcodes.get(sku, ""),
                    "Variant Price": p["prices"][size],
                    "Variant Compare At Price": "",
                    "Variant Inventory Tracker": "shopify",
                    # roasted to order, so never block a sale on stock count
                    "Variant Inventory Policy": "continue",
                    "Variant Fulfillment Service": "manual",
                    "Variant Requires Shipping": "TRUE",
                    "Variant Taxable": "TRUE",
                    "Variant Weight": f"{net_lb + tare_lb:.2f}",
                    "Variant Weight Unit": "lb",
                })
    return rows


def write(path, cols, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"wrote {path}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--catalog", help="live_catalog JSON (default: newest next to this script)")
    ap.add_argument("--fetch", action="store_true", help="re-pull ids/titles/prices from the storefront")
    ap.add_argument("--barcodes", metavar="CSV", help="SKU,UPC map")
    ap.add_argument("--barcodes-only", action="store_true",
                    help="emit an UPDATE/UPDATE file that only sets barcodes on existing variants")
    ap.add_argument("--tare-lb", type=float, default=0.0, help="packaging weight added to net")
    ap.add_argument("--only", help="comma list of base SKUs, e.g. LAB-001")
    ap.add_argument("-o", "--out", default="DrEvilCoffee_OptionA_RoastxBag_IMPORT.csv")
    args = ap.parse_args()

    products = load_snapshot(args.catalog)
    if args.only:
        keep = {s.strip().upper() for s in args.only.split(",")}
        products = [p for p in products if p["base_sku"] in keep]
    if args.fetch:
        products = fetch_live(products)

    got = {p["base_sku"] for p in products}
    if not args.only and got != set(BASE_SKUS):
        sys.exit(f"ERROR: catalog covers {sorted(got)}, expected LAB-001..LAB-006.")

    barcodes = load_barcodes(args.barcodes) if args.barcodes else {}
    rows = build_rows(products, barcodes, args.tare_lb)

    skus = [r["Variant SKU"] for r in rows]
    assert len(skus) == len(set(skus)), "duplicate SKU"
    unknown = set(barcodes) - set(skus)
    if unknown:
        sys.exit(f"ERROR: barcode map has SKUs not in the catalog: {sorted(unknown)[:5]}")

    if args.barcodes_only:
        if not barcodes:
            sys.exit("ERROR: --barcodes-only needs --barcodes.")
        out = [dict(r, **{"Variant Command": "UPDATE"}) for r in rows if r["Variant Barcode"]]
        write(args.out.replace(".csv", "_BARCODES.csv"), BARCODE_COLUMNS, out)
        print(f"  {len(out)} barcode updates")
        return

    write(args.out, COLUMNS, rows)
    blanks = sum(1 for r in rows if not r["Variant Barcode"])
    print(f"  {len(products)} products, {len(rows)} variants "
          f"({len(ROASTS)} roasts x {len(BAG_SIZES)} sizes)")
    print(f"  {blanks} variants still need a UPC")


if __name__ == "__main__":
    main()
