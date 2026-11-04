const USER = 'jonmasropian';
// Private repo featured on the home strip (Jon OK'd showing its status, never its contents).
const FEATURED_REPO = 'LMS_Backend';
const DAY = 86_400_000;

export type GithubActivity = {
  repo: string;
  isPrivate: boolean;
  lastAt: string;
  count30d: number;
  unit: 'commits' | 'pushes';
};

type GithubEvent = { type: string; created_at: string; repo: { name: string } };
type GithubCommit = { commit: { author: { date: string } } };

const headers = () => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': 'jonmasropian-portfolio',
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
});

async function getJson<T>(url: string): Promise<T | null> {
  // Cached for 10 min so visitors never hit GitHub's rate limit directly.
  const res = await fetch(url, { headers: headers(), next: { revalidate: 600 } });
  return res.ok ? res.json() : null;
}

// Server-only. Featured private repo needs GITHUB_TOKEN (read-only, that repo); otherwise public pushes.
export async function getGithubActivity(): Promise<GithubActivity | null> {
  try {
    if (process.env.GITHUB_TOKEN) {
      const since = new Date(Date.now() - 30 * DAY).toISOString();
      const commits = await getJson<GithubCommit[]>(
        `https://api.github.com/repos/${USER}/${FEATURED_REPO}/commits?per_page=100&since=${since}`,
      );
      const s = commits && summarizeCommits(commits);
      if (s) return s;
    }
    const events = await getJson<GithubEvent[]>(
      `https://api.github.com/users/${USER}/events/public?per_page=100`,
    );
    return events && summarizeEvents(events, Date.now());
  } catch {
    return null; // the strip falls back to a plain profile link
  }
}

export function summarizeCommits(commits: GithubCommit[]): GithubActivity | null {
  if (!commits.length) return null;
  const dates = commits.map((c) => c.commit.author.date).sort();
  return {
    repo: FEATURED_REPO,
    isPrivate: true,
    lastAt: dates[dates.length - 1],
    count30d: commits.length, // caller asked for the last 30 days only; capped at 100 (one page)
    unit: 'commits',
  };
}

export function summarizeEvents(events: GithubEvent[], now: number): GithubActivity | null {
  const pushes = events
    .filter((e) => e.type === 'PushEvent')
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  if (!pushes.length) return null;
  return {
    repo: pushes[0].repo.name.split('/')[1],
    isPrivate: false,
    lastAt: pushes[0].created_at,
    count30d: pushes.filter((e) => now - Date.parse(e.created_at) < 30 * DAY).length,
    unit: 'pushes',
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
