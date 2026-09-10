/**
 * The hero film — the full 24-second cut WITH sound.
 *
 * The homepage background uses the silent 12s loop. This is the one people can
 * actually press play on. Paste the share link from YouTube or Vimeo below;
 * the section renders nothing while `url` is empty, so the site never shows a
 * broken player.
 *
 *   YouTube:  https://youtu.be/XXXXXXXXXXX   or   https://www.youtube.com/watch?v=XXXXXXXXXXX
 *   Vimeo:    https://vimeo.com/123456789
 */
export const FILM = {
  url: '',
  title: 'My grandfather invented a villain in 1959. I turned it into coffee.',
  poster: '/assets/videos/hero-poster.jpg',
  /** Shown under the player. Keep it to one line. */
  caption: 'Shot in the lab. Canon R3. Third generation of the name.',
};

export type FilmEmbed =
  | { provider: 'youtube'; id: string }
  | { provider: 'vimeo'; id: string; hash?: string }
  | null;

/** Turns a pasted share link into an embeddable id. */
export function parseFilmUrl(url: string): FilmEmbed {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = u.pathname.slice(1).split('/')[0];
    return id ? { provider: 'youtube', id } : null;
  }
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    const v = u.searchParams.get('v');
    if (v) return { provider: 'youtube', id: v };
    const m = u.pathname.match(/^\/(?:shorts|embed)\/([^/?]+)/);
    return m ? { provider: 'youtube', id: m[1] } : null;
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    // vimeo.com/123456789  or an unlisted link  vimeo.com/123456789/abcdef1234
    const m = u.pathname.match(/(\d{6,})(?:\/([a-z0-9]{6,}))?/i);
    if (!m) return null;
    const hash = m[2] ?? u.searchParams.get('h') ?? undefined;
    return { provider: 'vimeo', id: m[1], hash };
  }
  return null;
}

export function embedSrc(embed: NonNullable<FilmEmbed>): string {
  if (embed.provider === 'youtube') {
    // nocookie host, no related-videos grid from other channels, autoplay on click
    const p = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      color: 'white',
    });
    return `https://www.youtube-nocookie.com/embed/${embed.id}?${p}`;
  }
  const p = new URLSearchParams({
    autoplay: '1',
    title: '0',
    byline: '0',
    portrait: '0',
    color: 'dc2626',
    dnt: '1',
  });
  if (embed.hash) p.set('h', embed.hash); // required for unlisted videos
  return `https://player.vimeo.com/video/${embed.id}?${p}`;
}
