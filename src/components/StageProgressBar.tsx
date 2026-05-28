interface StageProgressBarProps {
  percent: number;
  isEmpty?: boolean;
}

export function StageProgressBar({ percent, isEmpty = false }: StageProgressBarProps) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`完成度 ${percent}%`}>
      <div
        className={`h-full rounded-full ${isEmpty ? "bg-slate-200" : "bg-sky-600"}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
