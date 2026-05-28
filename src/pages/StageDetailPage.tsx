import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getStageById, getTopicsByStageId } from "../data/learningRoadmap";

export function StageDetailPage() {
  const { stageId } = useParams();
  const stage = stageId ? getStageById(stageId) : undefined;
  const topics = stageId ? getTopicsByStageId(stageId) : [];

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
      </section>

      <section className="space-y-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm"
          >
            <span className="mt-1 flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <BookOpen size={19} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold">{topic.title}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">{topic.summary}</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
