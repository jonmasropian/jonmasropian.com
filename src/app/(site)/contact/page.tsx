import type { Metadata } from 'next';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  return <PageHeading title="Contact" note="Stage 5: contact form that emails Jon directly." />;
}
