import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import AuthLayout from "./components/ui/common/authLayout";
import Signup from "./pages/auth/signup";
import AdminSideBar from "./components/admin-comp/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminProduct from "./pages/admin/admin-product";
import AdminOrder from "./pages/admin/admin-order";
import UserLayout from "./components/user-comp/user-lauout";
import Home from "./pages/users/user-home";
import ProductListing from "./pages/users/product-listing";
import PageNotFound from "./pages/auth/pagenotfound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/admin" element={<AdminSideBar />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
        <Route path="/e-com" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="product-lists" element={<ProductListing />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
