import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStageById, getTopicById } from "../data/learningRoadmap";
import { getTopicStatus, readProgress, writeTopicStatus } from "../lib/progressStorage";
import type { TopicStatus } from "../types/learning";

const statusLabels: Record<TopicStatus, string> = {
  "not-started": "未开始",
  "in-progress": "学习中",
  done: "已完成",
};

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
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700">
            {statusLabels[status]}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold">{topic.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{topic.summary}</p>
      </header>

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
