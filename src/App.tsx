import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ProgressPage } from "./pages/ProgressPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { StageDetailPage } from "./pages/StageDetailPage";
import { TopicDetailPage } from "./pages/TopicDetailPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RoadmapPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/stages/:stageId" element={<StageDetailPage />} />
        <Route path="/topics/:topicId" element={<TopicDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
