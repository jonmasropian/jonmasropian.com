import { NextResponse } from 'next/server';
import { getGithubActivity } from '@/lib/github';

// GET -> 200 { activity: GithubActivity | null, cachedSeconds }. GitHub itself is hit at most every 10 min.
export async function GET() {
  const activity = await getGithubActivity();
  return NextResponse.json(
    { activity, cachedSeconds: 600 },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600' } },
  );
}
