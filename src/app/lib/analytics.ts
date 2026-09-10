/**
 * Analytics — Meta Pixel + TikTok Pixel, one call site.
 *
 * Both loaders are gated on env vars and do NOTHING when unset, so this file is
 * safe to ship before the pixel IDs exist:
 *
 *   VITE_META_PIXEL_ID=1234567890
 *   VITE_TIKTOK_PIXEL_ID=ABCDEF123456
 *
 * Events (kept deliberately few — these are the ones the paid test reads):
 *   PageView          every route change
 *   ViewContent       a lot's configurator is opened          { base sku }
 *   roast_selected    custom — strongest early intent signal  { variant sku, roast }
 *   bag_size_selected custom                                   { variant sku, bag_size }
 *   grind_selected    custom                                   { variant sku, grind, brew }
 *   AddToCart         Storefront path added a line             { variant sku, roast, bag_size, grind }
 *
 * content_ids carries the full variant SKU (LAB-001-FC-12OZ) from the
 * configurator on, so intent is readable per roast x size.
 *   shop_click        custom — deep link out to shop.drevil.coffee
 *   film_play         custom — hero film started
 *
 * Meta standard events map 1:1; custom events go through fbq('trackCustom').
 * TikTok: ViewContent / AddToCart are standard; the rest are custom names.
 *
 * Conversions API (server-side) is NOT here — the Shopify Meta sales channel
 * covers Purchase/InitiateCheckout with CAPI on the checkout side. If site-side
 * CAPI is ever wanted, it is a Vercel function that mirrors these calls.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      load: (id: string) => void;
      page: () => void;
      track: (event: string, params?: Record<string, unknown>) => void;
      identify?: (params: Record<string, unknown>) => void;
      [k: string]: unknown;
    };
  }
}

const META_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim();
const TIKTOK_ID = (import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined)?.trim();

const META_STANDARD = new Set([
  'PageView',
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'Purchase',
  'Lead',
  'Search',
]);
const TIKTOK_STANDARD = new Set([
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'CompletePayment',
  'PlaceAnOrder',
  'Search',
  'ClickButton',
]);

let initialised = false;

/** Idempotent. Call once at app start. */
export function initAnalytics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;

  if (META_ID) {
    // Standard Meta Pixel bootstrap (queues calls until fbevents.js arrives).
    const w = window as Window & { fbq?: any };
    if (!w.fbq) {
      const n: any = (w.fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      });
      if (!w._fbq) w._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(s);
    }
    w.fbq('init', META_ID);
  }

  if (TIKTOK_ID) {
    // Standard TikTok Pixel bootstrap.
    const w = window as Window & { ttq?: any; TiktokAnalyticsObject?: string };
    w.TiktokAnalyticsObject = 'ttq';
    const ttq: any = (w.ttq = w.ttq || []);
    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
    ttq.setAndDefer = function (t: any, e: string) {
      t[e] = function (...args: unknown[]) {
        t.push([e, ...args]);
      };
    };
    for (const m of ttq.methods) ttq.setAndDefer(ttq, m);
    ttq.load = function (id: string) {
      const url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = {};
      const s = document.createElement('script');
      s.async = true;
      s.src = `${url}?sdkid=${id}&lib=ttq`;
      document.head.appendChild(s);
    };
    ttq.load(TIKTOK_ID);
  }
}

export const analyticsEnabled = () => Boolean(META_ID || TIKTOK_ID);

/** Route-change page view. */
export function trackPageView() {
  if (META_ID && window.fbq) window.fbq('track', 'PageView');
  if (TIKTOK_ID && window.ttq) window.ttq.page();
}

/** Fire one event to every configured pixel. Safe to call when none is set. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  if (META_ID && window.fbq) {
    const p = { ...params, content_type: 'product' };
    if (META_STANDARD.has(event)) window.fbq('track', event, p);
    else window.fbq('trackCustom', event, p);
  }

  if (TIKTOK_ID && window.ttq) {
    const p = { ...params, content_type: 'product' };
    window.ttq.track(TIKTOK_STANDARD.has(event) ? event : event, p);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, params);
  }
}

/** Meta-shaped product params from a SKU (content_ids drives catalog matching later). */
export const productParams = (sku: string, extra: Record<string, unknown> = {}) => ({
  content_ids: [sku],
  content_name: sku,
  ...extra,
});
