import MenuSidebar from "../../components/MenuSidebar/MenuSidebar";
import { Outlet } from "react-router-dom";

export default function ControlLayout() {
  return (
    <>
      <h2 className="text-2xl mb-10">Menu Management</h2>
      <div className="flex gap-12">
        <MenuSidebar />
        <Outlet />
      </div>
    </>
  );
}
