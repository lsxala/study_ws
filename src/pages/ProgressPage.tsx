import { learningTopics } from "../data/learningRoadmap";
import { getTopicStatus, readProgress } from "../lib/progressStorage";

export function ProgressPage() {
  const progress = readProgress();
  const doneCount = learningTopics.filter((topic) => getTopicStatus(progress, topic.id) === "done").length;
  const inProgressCount = learningTopics.filter((topic) => getTopicStatus(progress, topic.id) === "in-progress").length;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-medium text-sky-700">学习进度</p>
        <h1 className="mt-2 text-3xl font-bold">先看清自己走到哪一步</h1>
        <p className="mt-3 leading-7 text-slate-600">
          第一版会把进度保存在当前浏览器里，不需要登录。换浏览器或清理缓存后，进度可能会丢失。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ProgressCard label="全部知识点" value={learningTopics.length} />
        <ProgressCard label="学习中" value={inProgressCount} />
        <ProgressCard label="已完成" value={doneCount} />
      </section>
    </div>
  );
}

interface ProgressCardProps {
  label: string;
  value: number;
}

function ProgressCard({ label, value }: ProgressCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
