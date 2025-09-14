import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LoginModal from "../components/LoginModal";

const MainLayout = () => {
  const isAuth = false;
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-bg p-4 overflow-y-auto">
        <Outlet />

        {!isAuth && <LoginModal />}
      </main>
    </div>
  );
};

export default MainLayout;
