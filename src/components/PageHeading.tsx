// Shared title for the inner pages; stage placeholders use `note` until real content lands.
export default function PageHeading({ title, note }: { title: string; note?: string }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold text-balance uppercase">
        {title}
      </h1>
      {note && <p className="mt-8 max-w-[60ch] text-lg text-muted">{note}</p>}
    </section>
  );
}
