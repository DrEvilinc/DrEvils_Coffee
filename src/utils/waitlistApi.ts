import { projectId, publicAnonKey } from '../../utils/supabase/info';

/** Edge function folder is `server`; route prefix is `make-server-d19ebccd`. */
export function getWaitlistApiUrl(path: 'waitlist' | 'health' = 'waitlist'): string {
  const override = import.meta.env.VITE_WAITLIST_API_URL as string | undefined;
  if (override) {
    return override.replace(/\/$/, '') + (path === 'health' ? '/health' : '');
  }
  return `https://${projectId}.supabase.co/functions/v1/server/make-server-d19ebccd/${path}`;
}

export function getWaitlistAuthHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${publicAnonKey}`,
  };
}

export function formatWaitlistError(err: unknown, response?: Response): string {
  if (err instanceof Error) {
    const msg = err.message;
    if (
      msg === 'Load failed' ||
      msg === 'Failed to fetch' ||
      msg.includes('NetworkError') ||
      msg.includes('network')
    ) {
      return 'Unable to reach the laboratory servers. The signup service may be temporarily offline — please try again shortly.';
    }
    return msg;
  }
  if (response) {
    return `Signup failed (${response.status}). Please try again.`;
  }
  return 'Failed to submit. Please try again.';
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    throw new Error(`Empty response from server (${response.status})`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      response.ok
        ? 'Invalid response from server'
        : `Server error (${response.status}). The signup service may need to be redeployed.`
    );
  }
}

/** Primary + legacy Figma Make function URLs. */
export function getWaitlistSubmitUrls(): string[] {
  const urls = [getWaitlistApiUrl('waitlist')];
  const legacy = `https://${projectId}.supabase.co/functions/v1/make-server-d19ebccd/waitlist`;
  if (!urls.includes(legacy)) {
    urls.push(legacy);
  }
  return urls;
}

export async function submitWaitlistEntry(body: {
  email: string;
  name: string;
  phone: string;
}): Promise<{ success?: boolean; error?: string }> {
  let lastError: unknown;
  let lastResponse: Response | undefined;

  for (const url of getWaitlistSubmitUrls()) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getWaitlistAuthHeaders(),
        body: JSON.stringify(body),
      });
      lastResponse = response;
      const data = await parseJsonResponse<{ success?: boolean; error?: string }>(response);
      if (response.ok) {
        return data;
      }
      if (response.status === 404) {
        continue;
      }
      throw new Error(data.error || 'Failed to submit waitlist entry');
    } catch (err) {
      lastError = err;
      if (lastResponse?.status === 404) {
        continue;
      }
      throw err;
    }
  }

  throw lastError ?? new Error(formatWaitlistError(undefined, lastResponse));
}
