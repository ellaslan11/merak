export function SectionHeader({
  title,
  subtitle,
  action,
  label,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-3">
      <div>
        {label && <p className="merak-label mb-1">{label}</p>}
        <h2 className="heading-serif text-[19px] leading-snug text-espresso">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] text-warm-gray mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
