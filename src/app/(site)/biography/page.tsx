import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = { title: 'Biography' };

export default function Page() {
  return <PageHeading title="Biography" note="Stage 4: career timeline and certifications." />;
}
