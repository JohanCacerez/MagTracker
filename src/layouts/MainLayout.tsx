import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LoginModal from "../components/Modals/LoginModal";

import { useUserStore } from "../store/userStore";

const MainLayout = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const isAuth = !!currentUser;
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-bg p-4 overflow-hidden">
        <Outlet />

        {!isAuth && <LoginModal />}
      </main>
    </div>
  );
};

export default MainLayout;
