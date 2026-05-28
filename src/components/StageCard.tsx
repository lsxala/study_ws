import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { LearningStage } from "../types/learning";

interface StageCardProps {
  stage: LearningStage;
  topicCount: number;
}

export function StageCard({ stage, topicCount }: StageCardProps) {
  return (
    <Link
      to={`/stages/${stage.id}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
          第 {stage.order} 阶段
        </span>
        <ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" size={20} />
      </div>
      <h2 className="text-xl font-semibold text-slate-950">{stage.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{stage.goal}</p>
      <p className="mt-4 text-sm text-slate-500">{topicCount} 个入门知识点</p>
    </Link>
  );
}
