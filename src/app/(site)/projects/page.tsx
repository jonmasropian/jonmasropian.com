import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = { title: 'Projects' };

export default function Page() {
  return <PageHeading title="Projects" note="Stage 3: glass project cards." />;
}
