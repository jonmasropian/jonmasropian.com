import '@/styles/tailwind.css';

import type { Metadata, Viewport } from 'next';
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import Backdrop from '@/components/Backdrop';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { MOTION_KEY } from '@/lib/motion';

const display = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  adjustFontFallback: false, // next has no metrics for Big Shoulders; the stack in tailwind.css covers the swap
  variable: '--font-big-shoulders',
  display: 'block', // preloaded and brief; avoids the hero name flashing in a wide fallback face
});
const sans = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-plex-sans', display: 'swap' });
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.jonmasropian.com'),
  title: { default: 'Jon Masropian — Software Developer', template: '%s — Jon Masropian' },
  description:
    'Jon Masropian: 22-year U.S. Army veteran, now a Software Developer Apprentice at ERA Solutions. Projects, background, and contact.',
  openGraph: { type: 'website', title: 'Jon Masropian — Software Developer' },
};

export const viewport: Viewport = { themeColor: '#030306' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the head script below adds data-paused before React hydrates
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Set the visitor's Pause choice before first paint so CSS loops never start */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('${MOTION_KEY}')==='1')document.documentElement.setAttribute('data-paused','')}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ground focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Backdrop />
        <SiteNav />
        <main id="main" className="relative flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
