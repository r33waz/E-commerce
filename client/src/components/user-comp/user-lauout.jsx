import { Outlet } from "react-router-dom";
import Navbar from "./user-header";

const UserLayout = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-dark-theme  w-full">
      <Navbar />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};
export default UserLayout;
