import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import LoginModal from "./components/Modals/LoginModal";

function App() {
  const isAuth = true;
  return (
    <HashRouter>
      <AppRoutes />
      {!isAuth && <LoginModal />}
    </HashRouter>
  );
}

export default App;
