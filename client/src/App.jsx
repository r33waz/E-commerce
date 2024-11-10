import { Route, Routes, useLocation } from "react-router-dom";
import Login from "@/pages/auth/login";
import AuthLayout from "@/components/auth-comp/authLayout";
import Signup from "@/pages/auth/signup";
import AdminSideBar from "@/components/admin-comp/admin-layout";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdminProduct from "@/pages/admin/admin-product";
import AdminOrder from "@/pages/admin/admin-order";
import UserLayout from "@/components/user-comp/user-lauout";
import Home from "@/pages/users/user-home";
import ProductListing from "@/pages/users/product-listing";
import PageNotFound from "@/pages/auth/pagenotfound";
import ProtectedRoute from "@/components/protected-route-comp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "@/rtk/auth-slice/auth-thunk";
import Loading from "@/components/common/loading";
function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <Loading
        width={100}
        height={100}
        className="flex h-screen items-center justify-center w-full"
      />
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
            ></ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <AdminSideBar />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
        <Route
          path="/e-com"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-lists" element={<ProductListing />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
