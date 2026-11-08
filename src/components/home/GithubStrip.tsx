import { getGithubActivity, timeAgo } from '@/lib/github';
import { links } from '@/data/site';

export default async function GithubStrip({ className }: { className?: string }) {
  const a = await getGithubActivity();
  const label = 'text-dim';
  const value = 'text-ink';

  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-xs tracking-[0.06em] uppercase ${className ?? ''}`}>
      {a ? (
        <>
          <a href={links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-signal hover:text-ink">
            <span aria-hidden className="size-1.5 rounded-full bg-signal" />
            Live from GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span className={label}>
            Last {a.unit === 'commits' ? 'commit' : 'push'} <span className={value}>{timeAgo(a.lastAt, Date.now())}</span>
          </span>
          <span className={`${label} hidden sm:inline`}>
            Repo <span className={`${value} normal-case`}>{a.repo}</span>
            {a.isPrivate && <span className="ml-2">(private)</span>}
          </span>
          <span className={label}>
            Last 30 days{' '}
            <span className={value}>
              {a.count30d >= 100 ? '100+' : a.count30d} {a.unit}
            </span>
          </span>
        </>
      ) : (
        <a href={links.github} target="_blank" rel="noreferrer" className="text-signal hover:text-ink">
          GitHub · jonmasropian
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
