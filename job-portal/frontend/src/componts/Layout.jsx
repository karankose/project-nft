
import { Link, Outlet, useLocation } from "react-router-dom";
import { Images } from "../assets/image";
import routers from "../Routers";
import { useState,useEffect } from "react";
export const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePath, setActivePath] = useState("/dashboard");
  const { pathname } = useLocation();

  useEffect(() => {
    const basePath = "/" + (pathname.split("/")[1] ?? "dashboard");
    setActivePath(basePath);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const isCollapsed = isMobile || isSidebarCollapsed;

  return (
    <div className="content-container-wrapper">
      <div className="content-container">
        <div className="content-body">
          <div className={isCollapsed ? "side-panel-collapse" : "side-panel"}>
            <div className={isCollapsed ? "logo-container-collapse" : "logo-container"}>
              <img
                src={isCollapsed ? Images.logoMobileView : Images.Logo2}
                className="logo-container-img"
                alt="Happy Puppy Logo"
              />
              <div onClick={toggleSidebar} className="collapse-icon">
                <img
                  src={isCollapsed ? Images.CollapseRight : Images.CollapseLeft}
                  alt="Toggle Sidebar"
                />
              </div>
            </div>
            <hr className="hr-line" />  

            <div className={isCollapsed ? "sub-panel-collapse" : "sub-panel"}>
              <p className="Fs13_FW600 black  p-4">MENUS</p>
              <ul className="w-100">
                <li className={`py-3 px-4 ${activePath === "/dashboard/jobs" ? "active-menu" : ""}`}>
                  <Link to={routers.jobRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/dashboard/jobs"
                            ? Images.SelectedDashboard
                            : Images.Dashboard
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">Jobs</p>}
                    </span>
                  </Link>
                </li>
                <li className={`py-3 px-4 ${activePath === "/companyList" ? "active-menu" : ""}`}>
                  <Link to={routers.companyRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/companyList"
                            ? Images.SelectedUserManagment
                            : Images.UserManagment
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">Companies</p>}
                    </span>
                  </Link>
                </li>
                <li className={`py-3 px-4 ${activePath === "/resume" ? "active-menu" : ""}`}>
                  <Link to={routers.resumeRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/resume"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">Resume </p>}
                    </span>
                  </Link>
                </li>
                <li className={`py-3 px-4 ${activePath === "/yourResume" ? "active-menu" : ""}`}>
                  <Link to={routers.yourResumeRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/yourResume"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">your Resume </p>}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <main className="main-panel">
            <header className="cc-fixed-header">
              <div className="d-flex justify-content-between align-items-center">
                <Link to={routers.jobRouter}>Dashboard</Link>
                <div className="d-flex gap-2">
                  <div>
                    <img src={Images.Person1} width={40} height={40} alt="Profile" />
                  </div>
                  <div>
                    <p className="profile-name m-0">User demo</p>
                    <p className="profile-role m-0">User</p>
                  </div>
                </div>
              </div>
            </header>
            <div className="main-panel-scrollable">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
