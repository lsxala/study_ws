import { ArrowRight, CheckCircle2, CircleDot, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import { RoadmapTimeline } from "../components/RoadmapTimeline";
import { StageCard } from "../components/StageCard";
import { learningStages, learningTopics } from "../data/learningRoadmap";
import { readProgress } from "../lib/progressStorage";
import { getAllStageProgress, getNextTopic, getOverallProgress } from "../lib/roadmapProgress";

export function RoadmapPage() {
  const progress = readProgress();
  const overallProgress = getOverallProgress(progress);
  const stageProgressList = getAllStageProgress(progress);
  const nextTopic = getNextTopic(progress);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-sky-700">学习路线导航</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
            先看路线，再一步一步补齐软件测试能力
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            课程正文后续再逐步补充。现在先把路线结构搭好：你可以看到完整学习阶段，进入已开放的知识点，并记录当前学习状态。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {nextTopic ? (
              <Link
                to={`/topics/${nextTopic.id}`}
                className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
              >
                继续学习：{nextTopic.title}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ) : null}
            <Link
              to="/progress"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              查看进度
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <SummaryCard icon={<ListChecks size={20} aria-hidden="true" />} label="路线阶段" value={learningStages.length} />
          <SummaryCard icon={<CircleDot size={20} aria-hidden="true" />} label="已开放知识点" value={learningTopics.length} />
          <SummaryCard
            icon={<CheckCircle2 size={20} aria-hidden="true" />}
            label="已完成"
            value={overallProgress.doneCount}
            helper={`${overallProgress.inProgressCount} 个学习中`}
          />
        </div>
      </section>

      <RoadmapTimeline stages={stageProgressList} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stageProgressList.map((stageProgress) => (
            <StageCard
              key={stageProgress.stage.id}
              stage={stageProgress.stage}
              topicCount={stageProgress.totalCount}
              doneCount={stageProgress.doneCount}
              inProgressCount={stageProgress.inProgressCount}
            />
        ))}
      </section>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  helper?: string;
}

function SummaryCard({ icon, label, value, helper }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className="text-violet-700">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
      {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}
