import { Route, Routes } from "react-router-dom"
import GroupsPage from "../pages/GroupsPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/groups" element={<GroupsPage />} />
        </Routes>
    )
}

export default AppRouter;