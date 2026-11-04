import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = { title: 'Cyber Lab' };

export default function Page() {
  return <PageHeading title="Cyber Lab" note="Stage 5: the PostgreSQL terminal." />;
}
