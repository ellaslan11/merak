export function OpeningLetter({ text }: { text: string }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-4">Opening letter</h2>
      <p className="text-espresso/85 leading-relaxed text-lg whitespace-pre-line">
        {text}
      </p>
    </section>
  );
}
