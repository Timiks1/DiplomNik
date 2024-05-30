import { Route, Routes } from "react-router-dom"
import TeachersPage from "../pages/TeachersPage";
import SchedulePage from "../pages/SchedulePage";
import NewsPage from "../pages/NewsPage";
import TestPage from "../pages/TestPage";
import PlanningPage from "../pages/PlanningPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/planning" element={<PlanningPage />} />
        </Routes>
    )
}

export default AppRouter;