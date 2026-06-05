export function FuturePostcard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="mb-8">
      <div className="card-warm p-8 bg-gradient-to-br from-soft-gold/20 to-rose-muted/10 border-2 border-dashed border-soft-gold/40 rotate-[-0.5deg]">
        <p className="text-xs uppercase tracking-widest text-warm-gray mb-4">
          Postcard to future you
        </p>
        <h2 className="heading-serif text-xl text-espresso mb-4">{title}</h2>
        <p className="text-espresso/85 leading-relaxed italic">{body}</p>
        <p className="text-right text-sm text-warm-gray mt-6">— Merak</p>
      </div>
    </section>
  );
}
