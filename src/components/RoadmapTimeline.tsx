import { CheckCircle2, Clock3, LockKeyhole, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { StageProgressBar } from "./StageProgressBar";
import type { StageProgress } from "../lib/roadmapProgress";

interface RoadmapTimelineProps {
  stages: StageProgress[];
}

export function RoadmapTimeline({ stages }: RoadmapTimelineProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">学习路线</h2>
          <p className="mt-1 text-sm text-slate-500">按顺序走就好，后面的内容可以先知道位置。</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {stages.map((stageProgress) => (
          <Link
            key={stageProgress.stage.id}
            to={`/stages/${stageProgress.stage.id}`}
            className="grid gap-3 rounded-lg border border-slate-100 p-4 transition hover:border-sky-200 hover:bg-sky-50/40 md:grid-cols-[auto_1fr_auto]"
          >
            <span
              className={`flex size-10 items-center justify-center rounded-lg ${getStatusIconClass(stageProgress.status)}`}
            >
              {getStatusIcon(stageProgress.status)}
            </span>
            <span>
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-950">
                  第 {stageProgress.stage.order} 阶段：{stageProgress.stage.title}
                </span>
                <span className="text-sm text-slate-500">{getStatusText(stageProgress)}</span>
              </span>
              <span className="mt-2 block">
                <StageProgressBar percent={stageProgress.percent} isEmpty={stageProgress.totalCount === 0} />
              </span>
            </span>
            <span className="self-center text-sm font-medium text-slate-500 md:text-right">
              {stageProgress.totalCount > 0
                ? `${stageProgress.doneCount}/${stageProgress.totalCount} 完成`
                : "待补充"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function getStatusIcon(status: StageProgress["status"]) {
  if (status === "done") {
    return <CheckCircle2 size={20} aria-hidden="true" />;
  }

  if (status === "in-progress") {
    return <Clock3 size={20} aria-hidden="true" />;
  }

  if (status === "not-ready") {
    return <LockKeyhole size={20} aria-hidden="true" />;
  }

  return <PlayCircle size={20} aria-hidden="true" />;
}

function getStatusIconClass(status: StageProgress["status"]) {
  if (status === "done") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "in-progress") {
    return "bg-amber-50 text-amber-700";
  }

  if (status === "not-ready") {
    return "bg-slate-100 text-slate-500";
  }

  return "bg-sky-50 text-sky-700";
}

function getStatusText(stageProgress: StageProgress) {
  if (stageProgress.status === "not-ready") {
    return "内容待补充";
  }

  if (stageProgress.status === "done") {
    return "已完成";
  }

  if (stageProgress.status === "in-progress") {
    return "学习中";
  }

  return "可以开始";
}
