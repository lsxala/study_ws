import type { ProgressMap, TopicStatus } from "../types/learning";

const STORAGE_KEY = "software-testing-learning-progress";

export function readProgress(): ProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function writeTopicStatus(topicId: string, status: TopicStatus) {
  const progress = readProgress();
  const nextProgress = { ...progress, [topicId]: status };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
  return nextProgress;
}

export function getTopicStatus(progress: ProgressMap, topicId: string): TopicStatus {
  return progress[topicId] ?? "not-started";
}
