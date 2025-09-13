import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../pages/DashboardPage";
import MagazineListPage from "../pages/magazine/MagazineListPage";
import MagazineDetailPage from "../pages/magazine/MagazineDetailPage";
import DollieListPage from "../pages/dollie/DollieListPage";
import DollieDetailPage from "../pages/dollie/DollieDetailPage";
import { RegisterUserModal } from "../components/RegisterUserModal";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/settings" element={<RegisterUserModal />} />
        <Route path="/magazines" element={<MagazineListPage />} />
        <Route path="/magazines/:id" element={<MagazineDetailPage />} />
        <Route path="/dollies" element={<DollieListPage />} />
        <Route path="/dollies/:id" element={<DollieDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
