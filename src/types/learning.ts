export type LearningLevel = "入门" | "基础" | "进阶";

export type TopicStatus = "not-started" | "in-progress" | "done";

export interface LearningTopic {
  id: string;
  title: string;
  stageId: string;
  level: LearningLevel;
  summary: string;
  beginnerExplanation: string;
  whyItMatters: string;
  workScenario: string;
  prerequisites: string[];
  practice: string;
  doneCriteria: string[];
}

export interface LearningStage {
  id: string;
  title: string;
  order: number;
  goal: string;
  description: string;
  topicIds: string[];
}

export type ProgressMap = Record<string, TopicStatus>;
