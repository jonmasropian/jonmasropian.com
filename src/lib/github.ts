const USER = 'jonmasropian';
const DAY = 86_400_000;

export type GithubActivity = {
  lastPushRepo: string;
  lastPushAt: string;
  pushes30d: number;
};

type GithubEvent = { type: string; created_at: string; repo: { name: string } };

// Server-only: cached for 10 min so visitors never hit GitHub's rate limit directly.
export async function getGithubActivity(): Promise<GithubActivity | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=100`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'jonmasropian-portfolio',
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    return summarize(await res.json(), Date.now());
  } catch {
    return null; // the strip falls back to a plain profile link
  }
}

export function summarize(events: GithubEvent[], now: number): GithubActivity | null {
  const pushes = events
    .filter((e) => e.type === 'PushEvent')
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  if (!pushes.length) return null;
  return {
    lastPushRepo: pushes[0].repo.name.split('/')[1],
    lastPushAt: pushes[0].created_at,
    pushes30d: pushes.filter((e) => now - Date.parse(e.created_at) < 30 * DAY).length,
  };
}

export function timeAgo(iso: string, now: number): string {
  const mins = Math.max(0, Math.round((now - Date.parse(iso)) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
