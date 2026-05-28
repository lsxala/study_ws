import { learningStages, learningTopics } from "../data/learningRoadmap";
import { getTopicStatus } from "./progressStorage";
import type { LearningStage, LearningTopic, ProgressMap, TopicStatus } from "../types/learning";

export interface StageProgress {
  stage: LearningStage;
  topics: LearningTopic[];
  totalCount: number;
  doneCount: number;
  inProgressCount: number;
  notStartedCount: number;
  percent: number;
  status: "not-ready" | "not-started" | "in-progress" | "done";
}

export interface OverallProgress {
  totalCount: number;
  doneCount: number;
  inProgressCount: number;
  notStartedCount: number;
  percent: number;
}

export function getStageProgress(stage: LearningStage, progress: ProgressMap): StageProgress {
  const topics = learningTopics.filter((topic) => topic.stageId === stage.id);
  const totalCount = topics.length;
  const doneCount = countTopicsByStatus(topics, progress, "done");
  const inProgressCount = countTopicsByStatus(topics, progress, "in-progress");
  const notStartedCount = countTopicsByStatus(topics, progress, "not-started");
  const percent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const status =
    totalCount === 0
      ? "not-ready"
      : doneCount === totalCount
        ? "done"
        : inProgressCount > 0 || doneCount > 0
          ? "in-progress"
          : "not-started";

  return {
    stage,
    topics,
    totalCount,
    doneCount,
    inProgressCount,
    notStartedCount,
    percent,
    status,
  };
}

export function getAllStageProgress(progress: ProgressMap) {
  return learningStages.map((stage) => getStageProgress(stage, progress));
}

export function getOverallProgress(progress: ProgressMap): OverallProgress {
  const totalCount = learningTopics.length;
  const doneCount = countTopicsByStatus(learningTopics, progress, "done");
  const inProgressCount = countTopicsByStatus(learningTopics, progress, "in-progress");
  const notStartedCount = countTopicsByStatus(learningTopics, progress, "not-started");
  const percent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return {
    totalCount,
    doneCount,
    inProgressCount,
    notStartedCount,
    percent,
  };
}

export function getNextTopic(progress: ProgressMap) {
  return learningTopics.find((topic) => getTopicStatus(progress, topic.id) !== "done") ?? learningTopics[0];
}

export function getAdjacentStages(stageId: string) {
  const currentIndex = learningStages.findIndex((stage) => stage.id === stageId);

  return {
    previousStage: currentIndex > 0 ? learningStages[currentIndex - 1] : undefined,
    nextStage:
      currentIndex >= 0 && currentIndex < learningStages.length - 1
        ? learningStages[currentIndex + 1]
        : undefined,
  };
}

export function getAdjacentTopics(topicId: string) {
  const orderedTopics = learningStages.flatMap((stage) =>
    learningTopics.filter((topic) => topic.stageId === stage.id),
  );
  const currentIndex = orderedTopics.findIndex((topic) => topic.id === topicId);

  return {
    previousTopic: currentIndex > 0 ? orderedTopics[currentIndex - 1] : undefined,
    nextTopic:
      currentIndex >= 0 && currentIndex < orderedTopics.length - 1
        ? orderedTopics[currentIndex + 1]
        : undefined,
  };
}

function countTopicsByStatus(topics: LearningTopic[], progress: ProgressMap, status: TopicStatus) {
  return topics.filter((topic) => getTopicStatus(progress, topic.id) === status).length;
}
