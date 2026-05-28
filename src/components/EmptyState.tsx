import { Clock3 } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
          <Clock3 size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </section>
  );
}
