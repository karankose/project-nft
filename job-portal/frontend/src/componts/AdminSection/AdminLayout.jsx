
import { Link, Outlet, useLocation } from "react-router-dom";
import { Images } from "../../assets/image";
import routers from "../../Routers/index";
import { useState, useEffect } from "react";

export const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePath, setActivePath] = useState("admin-dashboard");
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split("/").slice(0, 3).join("/");
    setActivePath(path);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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
                alt="Company Logo"
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
              <p className="Fs13_FW600 black p-4">MENUS</p>
              <ul className="w-100">
                <li className={`py-3 px-4 ${activePath === "/info" ? "active-menu" : ""}`}>
                  <Link to={routers.adminGetInfoRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "  /info"
                            ? Images.SelectedDashboard
                            : Images.Dashboard
                        }
                        alt="Jobs Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">Information</p>}
                    </span>
                  </Link>
                </li>
                <li className={`py-3 px-4 ${activePath === "/userInfo" ? "active-menu" : ""}`}>
                  <Link to={routers.adminGetUserDataRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/userInfo"
                            ? Images.SelectedUserManagment
                            : Images.UserManagment
                        }
                        alt="Companies Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black">Users</p>}
                    </span>
                  </Link>
                </li>
                <li className={`py-3 px-4 ${activePath === "/recruiterInfo" ? "active-menu" : ""}`}>
                  <Link to={routers.adminGetRecruiterRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/recruiterInfo"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                        alt="Resume Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black"> Recruiters</p>}
                    </span>
                  </Link>
                </li>

                <li className={`py-3 px-4 ${activePath === "/inquiryInfo" ? "active-menu" : ""}`}>
                  <Link to={routers.inquiryTableRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/inquiryInfo"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                        alt="Resume Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black"> Inquiry Info</p>}
                    </span>
                  </Link>
                </li>

                <li className={`py-3 px-4 ${activePath === "/plans" ? "active-menu" : ""}`}>
                  <Link to={routers.plansRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/plans"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                        alt="Resume Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black"> plans </p>}
                    </span>
                  </Link>
                </li>

                <li className={`py-3 px-4 ${activePath === "/jobget" ? "active-menu" : ""}`}>
                  <Link to={routers.jobcurdRouter}>
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/jobget"
                            ? Images.SelectedReports
                            : Images.Reports
                        }
                        alt="Resume Icon"
                      />
                      {!isCollapsed && <p className="Fs16_FW600 black"> job</p>}
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
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src={Images.Person1} width={40} height={40} alt="Profile" />
                  </div>
                  <div>
                    <p className="profile-name m-0">Admin Name</p>
                    <p className="profile-role m-0">Admin</p>
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

export default AdminLayout;
