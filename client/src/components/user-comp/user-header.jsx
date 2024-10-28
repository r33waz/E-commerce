import Logo from "@/assets/images/logo.jpeg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="sticky top-0  w-full border-b  dark:bg-black bg-white  border-red-500  z-40">
      <div className="flex h-16 items-center   px-4 md:px-6">
        <Link to="/e-com/home">
          <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full" />
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
