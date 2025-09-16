import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
//support pages
import Error404Page from "../pages/support/Error404Page";
import MaintenacePage from "../pages/support/DevelopPage";
import DashboardPage from "../pages/DashboardPage";
import MagazineListPage from "../pages/magazine/MagazineListPage";
import MagazineDetailPage from "../pages/magazine/MagazineDetailPage";
import DollieListPage from "../pages/dollie/DollieListPage";
import DollieDetailPage from "../pages/dollie/DollieDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MaintenacePage />} />
        <Route path="/*" element={<Error404Page />} />
        <Route path="/magazines" element={<MagazineListPage />} />
        <Route path="/magazines/:id" element={<MagazineDetailPage />} />
        <Route path="/dollies" element={<DollieListPage />} />
        <Route path="/dollies/:id" element={<DollieDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
