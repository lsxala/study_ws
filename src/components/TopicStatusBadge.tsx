import type { TopicStatus } from "../types/learning";

const statusLabels: Record<TopicStatus, string> = {
  "not-started": "未开始",
  "in-progress": "学习中",
  done: "已完成",
};

const statusClasses: Record<TopicStatus, string> = {
  "not-started": "bg-slate-100 text-slate-600",
  "in-progress": "bg-amber-50 text-amber-700",
  done: "bg-emerald-50 text-emerald-700",
};

interface TopicStatusBadgeProps {
  status: TopicStatus;
}

export function TopicStatusBadge({ status }: TopicStatusBadgeProps) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-sm font-medium ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
