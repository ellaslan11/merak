"use client";

const MESSAGES = [
  "Gathering the little things…",
  "Finding the soft patterns…",
  "Writing your week back to you…",
  "Saving the moments that might have disappeared…",
];

export function LoadingState({ message }: { message?: string }) {
  const text =
    message ?? MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-rose-muted animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <p className="text-sm text-warm-gray font-medium">{text}</p>
    </div>
  );
}
