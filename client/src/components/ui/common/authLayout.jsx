import { Outlet } from "react-router-dom";
import WelcomeGif from "@/assets/gif/welcome.gif";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-6  lg:w-1/2 w-full border">
        <Outlet />
      </div>
      <div className="hidden lg:flex items-center justify-center  bg-dark-theme w-1/2  text-white">
        <p className="text-center flex flex-col gap-1 items-center">
          <img
            src={WelcomeGif}
            alt="logo"
            className="w-60 h-44 mb-6 object-cover"
            loading="lazy"
          />
          <span className="text-2xl font-medium">
            Browse, explore, and discover something just for you.
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
