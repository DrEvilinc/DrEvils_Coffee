#!/usr/bin/env python3
"""
Build a Matrixify Products import CSV that expands LAB-001..LAB-006 into three
roast variants each (18 variants total).

    Option1 Name  = "Roast"
    Option1 Value = Low Voltage | Full Charge | Maximum Overdrive
    Variant SKU   = <base>-LV | -FC | -MO      (Morris STYLE-VARIANT convention)

Grind is deliberately NOT a variant. It rides as a cart line-item property, so
the catalog stays at 18 variants instead of ~126.

Two modes:

  # 1. Preferred - expand from a real Matrixify export of the 6 products.
  #    Export from Shopify with at least: Handle, Title, Variant SKU,
  #    Variant Price, Variant Weight, Variant Weight Unit.
  python build_roast_variants_matrixify.py --from-export coffee_export.csv \
      -o DrEvilCoffee_RoastVariants_IMPORT.csv

  # 2. Skeleton - emit the shape with blanks to fill in by hand.
  python build_roast_variants_matrixify.py --template \
      -o DrEvilCoffee_RoastVariants_IMPORT.csv

BARCODES ARE LEFT BLANK ON PURPOSE. Each of the 18 variants needs its own real
UPC before this imports cleanly into RICS - UPC is the universal join key across
the estate and inventing them would poison that join. Fill the Variant Barcode
column from the next free block in the Dr. Evil UPC range, then import.

Run --dry-run first. Always Matrixify-preview before committing an import.
"""

import argparse
import csv
import sys

ROASTS = [
    ("Low Voltage", "LV"),
    ("Full Charge", "FC"),
    ("Maximum Overdrive", "MO"),
]

BASE_SKUS = [f"LAB-{i:03d}" for i in range(1, 7)]

COLUMNS = [
    "Handle",
    "Title",
    "Command",
    "Option1 Name",
    "Option1 Value",
    "Variant SKU",
    "Variant Barcode",
    "Variant Price",
    "Variant Inventory Tracker",
    "Variant Inventory Policy",
    "Variant Requires Shipping",
    "Variant Taxable",
    "Variant Weight",
    "Variant Weight Unit",
    "Variant Command",
]


def base_sku_of(sku: str) -> str:
    """LAB-001 or LAB-001-XX -> LAB-001."""
    parts = (sku or "").strip().upper().split("-")
    return "-".join(parts[:2]) if len(parts) >= 2 else sku.strip().upper()


def rows_for(handle, title, base_sku, price, weight, weight_unit):
    out = []
    for idx, (roast, suffix) in enumerate(ROASTS):
        out.append({
            "Handle": handle,
            # Matrixify only needs Title on the product's first row.
            "Title": title if idx == 0 else "",
            "Command": "MERGE" if idx == 0 else "",
            "Option1 Name": "Roast",
            "Option1 Value": roast,
            "Variant SKU": f"{base_sku}-{suffix}",
            "Variant Barcode": "",          # <- fill with a real UPC before import
            "Variant Price": price,
            "Variant Inventory Tracker": "shopify",
            "Variant Inventory Policy": "continue",   # roast-to-order, never oversell-block
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Weight": weight,
            "Variant Weight Unit": weight_unit,
            "Variant Command": "MERGE",
        })
    return out


def from_export(path):
    rows, seen = [], set()
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        missing = {"Handle", "Variant SKU"} - set(reader.fieldnames or [])
        if missing:
            sys.exit(f"ERROR: export is missing required column(s): {sorted(missing)}")

        for r in reader:
            handle = (r.get("Handle") or "").strip()
            base = base_sku_of(r.get("Variant SKU", ""))
            if not handle or base in seen:
                continue
            if base not in BASE_SKUS:
                print(f"  skipping unrecognised SKU {base!r} (not LAB-001..LAB-006)")
                continue
            seen.add(base)
            rows += rows_for(
                handle,
                (r.get("Title") or "").strip(),
                base,
                (r.get("Variant Price") or "").strip(),
                (r.get("Variant Weight") or "").strip(),
                (r.get("Variant Weight Unit") or "g").strip(),
            )

    absent = [s for s in BASE_SKUS if s not in seen]
    if absent:
        print(f"  WARNING: no export row matched {', '.join(absent)}")
    return rows


def template():
    rows = []
    for base in BASE_SKUS:
        rows += rows_for(
            handle=base.lower(),           # e.g. lab-001 -> confirm the real handle
            title=f"TODO product title for {base}",
            base_sku=base,
            price="",
            weight="",
            weight_unit="g",
        )
    return rows


def main():
    ap = argparse.ArgumentParser()
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--from-export", metavar="CSV",
                     help="Matrixify export of the 6 coffee products")
    src.add_argument("--template", action="store_true",
                     help="emit a fill-in skeleton instead")
    ap.add_argument("-o", "--out", default="DrEvilCoffee_RoastVariants_IMPORT.csv")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    rows = from_export(args.from_export) if args.from_export else template()

    if not rows:
        sys.exit("ERROR: produced 0 rows — check the export file.")

    if args.dry_run:
        w = csv.DictWriter(sys.stdout, fieldnames=COLUMNS)
        w.writeheader()
        w.writerows(rows)
    else:
        with open(args.out, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=COLUMNS)
            w.writeheader()
            w.writerows(rows)
        print(f"wrote {args.out}")

    n_products = len({r['Handle'] for r in rows})
    blanks = sum(1 for r in rows if not r["Variant Barcode"])
    print(f"  {n_products} products, {len(rows)} variants")
    print(f"  {blanks} variants still need a UPC in Variant Barcode before import")


if __name__ == "__main__":
    main()
