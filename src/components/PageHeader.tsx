type Props = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: Props) {
  return (
    <section className="w-full bg-[color:var(--sage-light)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h1
          className="text-3xl font-bold leading-tight text-[color:var(--brand-red)] sm:text-4xl"
          style={{ fontFamily: '"Baloo 2", sans-serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm text-foreground/70 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
