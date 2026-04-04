"use client";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <div className="w-full max-w-[400px] h-1 bg-border rounded-sm overflow-hidden">
      <div
        className="h-full bg-accent rounded-sm transition-[width] duration-400 ease-out"
        style={{ width: `${clampedProgress * 100}%` }}
      />
    </div>
  );
}
