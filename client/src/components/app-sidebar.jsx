import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/rtk/auth-slice/auth-thunk";
import Loading from "./common/loading";
import ThemeToggle from "./theme-toggle";

function AppSidebar({ data }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  console.log(pathname);
  const handleLogout = () => {
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        navigate("/auth/login");
      });
  };
  return (
    <SidebarProvider className="dark:bg-dark-theme dark:text-white">
      <Sidebar collapsible="icon" className="bg-light-theme">
        <SidebarHeader >
          <SidebarMenu >
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square  items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ">
                  Logo
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin</span>
                  <span className="truncate text-xs">
                    {pathname.toUpperCase().split("/")[2]}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data?.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${
                        pathname === item.url
                          ? "dark:hover:bg-gray-400/40 cursor-pointer hover:bg-gray-400/40 bg-gray-400/40"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span>{item.label.toUpperCase()}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="dark:bg-gray-500 dark:text-white dark:bg-opacity-60"
            >
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user.username} />
                  <AvatarFallback className="rounded-lg text-xl bg-gray-400 text-black">
                    {user?.username ? user?.username[0] : "a"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.username}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg  dark:bg-gray-700 dark:text-white dark:bg-opacity-60"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2  py-1.5 px-2.5 text-sm flex-col ">
                  <div className="flex gap-2 w-full justify-start ">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={user.username} />
                      <AvatarFallback className="rounded-lg bg-gray-400  text-black text-xl">
                        {user?.username ? user?.username[0] : "a"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid place-items-start w-full  text-sm ">
                      <span className="truncate font-semibold">
                        {user.username}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  className="flex items-center gap-1 dark:bg-white dark:text-black bg-black text-white hover:bg-opacity-70 w-full"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <Loading width={25} height={25} />
                  ) : (
                    <>
                      <LogOut />
                      Logout
                    </>
                  )}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex w-full justify-between items-center">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">ADMIN</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {pathname.toUpperCase().split("/")[2]}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 dark:bg-dark-theme ">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppSidebar;
