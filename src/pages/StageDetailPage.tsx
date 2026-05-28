import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { StageProgressBar } from "../components/StageProgressBar";
import { TopicStatusBadge } from "../components/TopicStatusBadge";
import { getStageById, getTopicsByStageId } from "../data/learningRoadmap";
import { getTopicStatus, readProgress } from "../lib/progressStorage";
import { getAdjacentStages, getStageProgress } from "../lib/roadmapProgress";

export function StageDetailPage() {
  const { stageId } = useParams();
  const stage = stageId ? getStageById(stageId) : undefined;
  const topics = stageId ? getTopicsByStageId(stageId) : [];
  const progress = readProgress();

  if (!stage) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">没有找到这个学习阶段</h1>
        <Link className="mt-4 inline-flex text-sky-700" to="/">
          返回学习路线
        </Link>
      </div>
    );
  }

  const stageProgress = getStageProgress(stage, progress);
  const { previousStage, nextStage } = getAdjacentStages(stage.id);
  const firstTopic = topics[0];

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700">
        <ArrowLeft size={17} aria-hidden="true" />
        返回学习路线
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-medium text-sky-700">第 {stage.order} 阶段</p>
        <h1 className="mt-2 text-3xl font-bold">{stage.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{stage.description}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
              <span>阶段完成度</span>
              <span>
                {stageProgress.totalCount > 0
                  ? `${stageProgress.doneCount}/${stageProgress.totalCount} 已完成`
                  : "内容待补充"}
              </span>
            </div>
            <div className="mt-2">
              <StageProgressBar percent={stageProgress.percent} isEmpty={stageProgress.totalCount === 0} />
            </div>
          </div>
          {firstTopic ? (
            <Link
              to={`/topics/${firstTopic.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              开始本阶段
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </section>

      {topics.length > 0 ? (
        <section className="space-y-3">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm"
            >
              <span className="flex items-start gap-4">
                <span className="mt-1 flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <BookOpen size={19} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-semibold">{topic.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{topic.summary}</span>
                </span>
              </span>
              <TopicStatusBadge status={getTopicStatus(progress, topic.id)} />
            </Link>
          ))}
        </section>
      ) : (
        <EmptyState
          title="这个阶段的正文后续补充"
          description="路线位置已经先保留下来。等我们补内容时，会按照“这是什么、为什么要学、工作里怎么用、小练习、过关标准”的结构逐个添加知识点。"
        />
      )}

      <section className="grid gap-3 md:grid-cols-2">
        {previousStage ? (
          <Link
            to={`/stages/${previousStage.id}`}
            className="rounded-lg border border-slate-200 bg-white p-5 hover:border-sky-200 hover:bg-sky-50/40"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
              <ArrowLeft size={16} aria-hidden="true" />
              上一阶段
            </span>
            <span className="mt-2 block text-lg font-semibold text-slate-950">{previousStage.title}</span>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-5 text-slate-400">
            已经是第一阶段
          </div>
        )}

        {nextStage ? (
          <Link
            to={`/stages/${nextStage.id}`}
            className="rounded-lg border border-slate-200 bg-white p-5 text-right hover:border-sky-200 hover:bg-sky-50/40"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
              下一阶段
              <ArrowRight size={16} aria-hidden="true" />
            </span>
            <span className="mt-2 block text-lg font-semibold text-slate-950">{nextStage.title}</span>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-5 text-right text-slate-400">
            已经是最后阶段
          </div>
        )}
      </section>
    </div>
  );
}
