import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userLogin } from "@/rtk/auth-slice/auth-thunk";
import Loading from "@/components/common/loading";

const Login = () => {
  const [isShoewPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state?.auth
  );
  const LoginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className=" flex items-center justify-center w-full lg:px-0 sm:px-4">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-[450px] w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <span className="text-xs">
            Your Account, Your World – Access It All Here.
          </span>
          <form className="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block lg:text-sm text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                {...register("email")}
              />
              {errors.email && (
                <span className="mt-1 text-xs text-red-600">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={isShoewPass ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full lg:text-sm text-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                {...register("password")}
              />
              <span
                type="button"
                className="absolute right-2 top-11 -translate-y-1/2"
                onClick={() => setShowPass(!isShoewPass)}
              >
                {isShoewPass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M226 171.47a3.9 3.9 0 0 1-2 .53a4 4 0 0 1-3.47-2l-21.15-37a120 120 0 0 1-41.91 19.53l6.53 38.81a4 4 0 0 1-3.29 4.6a4 4 0 0 1-.67.06a4 4 0 0 1-3.94-3.34l-6.41-38.5a128.2 128.2 0 0 1-43.28 0l-6.41 38.5a4 4 0 0 1-4 3.34a4 4 0 0 1-.67-.06a4 4 0 0 1-3.29-4.6l6.48-38.83A120 120 0 0 1 56.62 133l-21.15 37a4 4 0 0 1-3.47 2a3.9 3.9 0 0 1-2-.53a4 4 0 0 1-1.47-5.47l21.68-37.94a148.2 148.2 0 0 1-21.32-21.56a4 4 0 1 1 6.22-5C52.25 122.71 82.29 148 128 148s75.75-25.29 92.89-46.51a4 4 0 1 1 6.22 5a148.2 148.2 0 0 1-21.32 21.56L227.47 166a4 4 0 0 1-1.47 5.47"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36"
                    />
                  </svg>
                )}
              </span>
              {errors.password && (
                <span className="mt-1 text-xs text-red-600">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center py-6 px-4   shadow-sm text-base font-medium bg-dark-theme text-white rounded-lg hover:bg-dark-theme"
              disabled={loading}
            >
              {loading ? <Loading width={25} height={25} /> : "Login"}
            </Button>
          </form>
          <div className="flex w-full justify-between items-center pt-4">
            <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
            <Link
              to="/auth/signup"
              className="text-primary hover:text-primary-focus font-medium underline underline-offset-4"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
