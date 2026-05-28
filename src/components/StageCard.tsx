import { ArrowRight, Circle, CircleCheck, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { StageProgressBar } from "./StageProgressBar";
import type { LearningStage } from "../types/learning";

interface StageCardProps {
  stage: LearningStage;
  topicCount: number;
  doneCount: number;
  inProgressCount: number;
}

export function StageCard({ stage, topicCount, doneCount, inProgressCount }: StageCardProps) {
  const hasTopics = topicCount > 0;
  const isDone = hasTopics && doneCount === topicCount;
  const statusText = !hasTopics
    ? "内容待补充"
    : isDone
      ? "阶段已完成"
      : inProgressCount > 0
        ? "正在学习"
        : "可以开始";

  return (
    <Link
      to={`/stages/${stage.id}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
          第 {stage.order} 阶段
        </span>
        <ArrowRight
          className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600"
          size={20}
          aria-hidden="true"
        />
      </div>
      <h2 className="text-xl font-semibold text-slate-950">{stage.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{stage.goal}</p>
      <div className="mt-4">
        <StageProgressBar percent={topicCount === 0 ? 0 : Math.round((doneCount / topicCount) * 100)} isEmpty={!hasTopics} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">{hasTopics ? `${topicCount} 个知识点` : "后续补内容"}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
          {isDone ? (
            <CircleCheck size={16} className="text-emerald-600" aria-hidden="true" />
          ) : inProgressCount > 0 ? (
            <Clock3 size={16} className="text-amber-600" aria-hidden="true" />
          ) : (
            <Circle size={16} className="text-slate-400" aria-hidden="true" />
          )}
          {statusText}
        </span>
      </div>
    </Link>
  );
}
