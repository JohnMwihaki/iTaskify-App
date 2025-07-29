import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./componets/ProtectedRoutes";
import PublicLayout from "./layouts/PublicLayout";

import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import CreateTaskPage from "./pages/NewTaskPage";
import AllTasksPage from "./pages/taskPage";
import CompletedTasksPage from "./pages/completedTasksPage";
import TrashPage from "./pages/TrashPage";
import EditTaskPage from "./pages/EditTaskPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/tasks" element={<AllTasksPage />} />
            <Route path="/edit/:taskId" element={<EditTaskPage />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
            <Route path="/trash" element={<TrashPage />} />
           
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
