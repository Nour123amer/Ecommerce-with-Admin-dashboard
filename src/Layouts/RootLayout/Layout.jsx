import Navbar from "../../components/app/Navbar/Navbar";
import Footer from "../../components/app/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";

export default function Layout() {
  const location = useLocation();
  const isPathHome = location.pathname === "/" || location.pathname === "/home";
  const { theme } = useContext(ThemeContext);
  const { themeColor, setThemeColor } = useContext(ThemeColorContext);

  useEffect(() => {
    if (theme) {
      setThemeColor("bg-white text-gray-600");
    } else {
      setThemeColor("bg-black text-white");
    }
  }, [theme, setThemeColor]);

  console.log(themeColor)
  return (
    <>
      <div
        className={` ${
          isPathHome
            ? `bg-[url('https://i.pinimg.com/736x/8e/53/c7/8e53c7f79c28df97acfa550a1b575ed0.jpg')] bg-center ${themeColor} bg-no-repeat bg-cover  w-screen h-screen text-white`
            : "text-gray-950  "
        }`}
      >
        <Navbar
          className={!isPathHome ? "!bg-gray-600" : ""}
          isHome={isPathHome}
        />
        <div className="max-w-[2000px] mx-auto min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
