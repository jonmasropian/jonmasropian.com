import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Cert } from '@/data/biography';

const link = 'tap inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] uppercase transition-colors';

// `featured` = full-width row (certificate left, details right on lg), same pattern as ProjectCard.
export default function CertCard({ cert: c, featured }: { cert: Cert; featured?: boolean }) {
  return (
    <article
      className={`panel flex flex-col overflow-hidden rounded-[18px] ${featured ? 'lg:flex-row' : ''}`}
    >
      <div
        className={`relative aspect-[3/2] shrink-0 overflow-hidden border-b border-hairline bg-ink/90 ${featured ? 'lg:aspect-[1200/927] lg:w-[52%] lg:border-r lg:border-b-0' : ''}`}
      >
        {c.image ? (
          <Image
            src={c.image}
            alt={`${c.title} certificate issued to Jon Masropian`}
            fill
            sizes={featured ? '(min-width: 1024px) 52vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'}
            className="object-contain"
          />
        ) : (
          // No certificate file yet: the issuer's name stands in, set in the display face.
          <div className="absolute inset-0 flex items-end bg-gradient-to-br from-navy to-ground p-5">
            <span className="font-display text-5xl leading-[0.85] font-extrabold text-ink/90 uppercase">
              {c.issuer}
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-5 lg:p-6 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <h3 className={`font-medium text-balance text-ink ${featured ? 'text-3xl lg:text-4xl' : 'text-lg'}`}>
          {c.title}
        </h3>
        <p className="mt-1 text-muted">{c.issuer}</p>

        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs text-dim tabular-nums">
          <dt>Issued</dt>
          <dd className="text-muted">{c.issued}</dd>
          {c.expires && (
            <>
              <dt>Valid to</dt>
              <dd className="text-muted">{c.expires}</dd>
            </>
          )}
          {c.number && (
            <>
              <dt>Cert #</dt>
              <dd className="text-muted">{c.number}</dd>
            </>
          )}
          {c.verify && (
            <>
              <dt>Code</dt>
              <dd className="break-all text-muted select-all">{c.verify.code}</dd>
            </>
          )}
        </dl>

        {(c.image || c.verify) && (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-7 pt-1 md:gap-y-2 lg:mt-auto lg:pt-5">
            {c.verify && (
              <a href={c.verify.url} target="_blank" rel="noreferrer" className={`${link} text-signal hover:text-ink`}>
                Verify at CompTIA <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {c.badge && (
              <a href={c.badge} target="_blank" rel="noreferrer" className={`${link} text-signal hover:text-ink`}>
                Credly badge <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
                <span className="sr-only"> for {c.title} (opens in a new tab)</span>
              </a>
            )}
            {c.image && (
              <a href={c.image} target="_blank" rel="noreferrer" className={`${link} text-dim hover:text-ink`}>
                Full size <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
                <span className="sr-only"> {c.title} certificate (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
