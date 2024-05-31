import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TeachersPage from "../pages/TeachersPage";
import SchedulePage from "../pages/SchedulePage";
import NewsPage from "../pages/NewsPage";
import TestPage from "../pages/TestPage";
import PlanningPage from "../pages/PlanningPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Проверка наличия токена и установка состояния аутентификации

    return (
        <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/test" element={<TestPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/planning" element={<PlanningPage />} />
            </Route>
            <Route path="*" element={<Navigate to={isAuthenticated ? "/groups" : "/login"} />} />
        </Routes>
    );
}

export default AppRouter;
