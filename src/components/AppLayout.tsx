import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/onboarding";

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-20 md:pb-0">
        <Outlet />
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
