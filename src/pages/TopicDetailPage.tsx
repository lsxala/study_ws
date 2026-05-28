import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TopicStatusBadge } from "../components/TopicStatusBadge";
import { getStageById, getTopicById } from "../data/learningRoadmap";
import { getTopicStatus, readProgress, writeTopicStatus } from "../lib/progressStorage";
import { getAdjacentTopics } from "../lib/roadmapProgress";
import type { TopicStatus } from "../types/learning";

export function TopicDetailPage() {
  const { topicId } = useParams();
  const topic = topicId ? getTopicById(topicId) : undefined;
  const stage = topic ? getStageById(topic.stageId) : undefined;
  const [progress, setProgress] = useState(() => readProgress());

  const status = useMemo(() => {
    return topic ? getTopicStatus(progress, topic.id) : "not-started";
  }, [progress, topic]);

  if (!topic || !stage) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">没有找到这个知识点</h1>
        <Link className="mt-4 inline-flex text-sky-700" to="/">
          返回学习路线
        </Link>
      </div>
    );
  }

  const { previousTopic, nextTopic } = getAdjacentTopics(topic.id);
  const prerequisiteTopics = topic.prerequisites
    .map((prerequisiteId) => getTopicById(prerequisiteId))
    .filter((item) => item !== undefined);

  function updateStatus(nextStatus: TopicStatus) {
    if (!topic) {
      return;
    }
    setProgress(writeTopicStatus(topic.id, nextStatus));
  }

  return (
    <article className="space-y-6">
      <Link
        to={`/stages/${stage.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        返回{stage.title}
      </Link>

      <header className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-sky-50 px-2.5 py-1 text-sm font-medium text-sky-700">{stage.title}</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">{topic.level}</span>
          <TopicStatusBadge status={status} />
        </div>
        <h1 className="mt-4 text-3xl font-bold">{topic.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{topic.summary}</p>
      </header>

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-lg font-semibold">学习位置</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            当前知识点属于「{stage.title}」。先看懂前置知识，再继续下一节，会更顺。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {prerequisiteTopics.length > 0 ? (
              prerequisiteTopics.map((prerequisite) => (
                <Link
                  key={prerequisite.id}
                  to={`/topics/${prerequisite.id}`}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  前置：{prerequisite.title}
                </Link>
              ))
            ) : (
              <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                不需要前置知识
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {previousTopic ? (
            <Link
              to={`/topics/${previousTopic.id}`}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              上一节
            </Link>
          ) : null}
          {nextTopic ? (
            <Link
              to={`/topics/${nextTopic.id}`}
              className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              下一节
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <LearningBlock title="这是什么" content={topic.beginnerExplanation} />
        <LearningBlock title="为什么要学" content={topic.whyItMatters} />
        <LearningBlock title="工作里怎么用" content={topic.workScenario} />
        <LearningBlock title="小练习" content={topic.practice} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CheckCircle2 className="text-emerald-600" size={22} aria-hidden="true" />
          过关标准
        </h2>
        <ul className="mt-4 space-y-2 text-slate-600">
          {topic.doneCriteria.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => updateStatus("not-started")}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          标记未开始
        </button>
        <button
          type="button"
          onClick={() => updateStatus("in-progress")}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          标记为学习中
        </button>
        <button
          type="button"
          onClick={() => updateStatus("done")}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          标记完成
        </button>
      </section>
    </article>
  );
}

interface LearningBlockProps {
  title: string;
  content: string;
}

function LearningBlock({ title, content }: LearningBlockProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{content}</p>
    </section>
  );
}
