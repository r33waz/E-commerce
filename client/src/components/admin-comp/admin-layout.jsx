import AppSidebar from "../app-sidebar";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

const AdminSideBar = () => {
  const adminSidebarMenu = [
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard />,
      isActive: true,
    },
    {
      id: "products",
      label: "Products",
      url: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      url: "/admin/orders",
      icon: <BadgeCheck />,
    },
  ];
  return (
    <>
      <div className="flex flex-col h-screen w-full">
      <AppSidebar data={adminSidebarMenu} />
    </div>
    </>
  );
};
export default AdminSideBar;
