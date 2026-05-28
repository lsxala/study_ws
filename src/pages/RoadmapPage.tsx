import { StageCard } from "../components/StageCard";
import { learningStages } from "../data/learningRoadmap";

export function RoadmapPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-sky-700">学习路线导航</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
          从“软件测试是什么”开始，不跳步地学完整条路线
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          这个网站会把软件测试拆成一个个小主题。每个主题都会告诉你它是什么、为什么要学、工作里怎么用，以及一个可以马上完成的小练习。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {learningStages.map((stage) => (
          <StageCard key={stage.id} stage={stage} topicCount={stage.topicIds.length} />
        ))}
      </section>
    </div>
  );
}
