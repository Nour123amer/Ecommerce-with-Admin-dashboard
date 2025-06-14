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
        className={`bg-center bg-no-repeat bg-cover  w-screen h-screen ${
          isPathHome
            ? `  text-white`
            : "text-gray-950 bg-transparent "
        }`}
         style={
         
         isPathHome ? {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://i.ibb.co/ymGrNvtr/Chat-GPT-Image-Jun-15-2025-12-51-14-AM.png')`,
  }:{}}
      >
       {/* <div
      className={`w-screen min-h-screen bg-cover bg-no-repeat bg-center ${
        isPathHome ? "text-white" : "bg-white text-gray-950"
      }`}
      style={
        isPathHome
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://i.ibb.co/ymGrNvtr/Chat-GPT-Image-Jun-15-2025-12-51-14-AM.png')`,
            }
          : {}
      }
    > */}
    
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
