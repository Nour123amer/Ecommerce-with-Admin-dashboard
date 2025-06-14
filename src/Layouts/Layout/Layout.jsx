import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="fixed top-[80px] bottom-0 right-0 w-[calc(100%-350px)] px-12 pt-24 overflow-y-scroll max-h-screen ">
        <Outlet />
      </div>
    </>
  );
}
