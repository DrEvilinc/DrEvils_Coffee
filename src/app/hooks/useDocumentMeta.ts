import { useEffect } from 'react';

const SITE = 'https://drevil.coffee';

interface Meta {
  title: string;
  description?: string;
  /** Path only, e.g. '/collection'. Defaults to '/'. */
  path?: string;
}

function setNamedMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setPropMeta(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/**
 * Per-route document title + meta for a client-rendered SPA. This improves UX and
 * on-page signals; for full crawlability of each route, add build-time
 * prerendering/SSG (see AUDIT_and_BUILD_PLAN.md — "Prerender the routes").
 */
export function useDocumentMeta({ title, description, path = '/' }: Meta) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = title;
    if (description) {
      setNamedMeta('description', description);
      setPropMeta('og:description', description);
      setNamedMeta('twitter:description', description);
    }
    setPropMeta('og:title', title);
    setPropMeta('og:url', url);
    setNamedMeta('twitter:title', title);
    setCanonical(url);
  }, [title, description, path]);
}
