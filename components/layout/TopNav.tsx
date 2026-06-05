import Link from "next/link";

export function TopNav({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-espresso/5">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/home" className="heading-serif text-lg text-espresso">
          Merak
        </Link>
        {title && (
          <span className="text-sm text-warm-gray truncate max-w-[180px]">
            {title}
          </span>
        )}
        <Link
          href="/settings"
          className="text-sm text-warm-gray hover:text-espresso transition-colors"
        >
          Settings
        </Link>
      </div>
    </header>
  );
}
