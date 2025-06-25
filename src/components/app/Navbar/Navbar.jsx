// import { Link, NavLink } from "react-router-dom";
// import { FaCartShopping } from "react-icons/fa6";
// import { useContext, useEffect } from "react";
// import { CounterContext } from "../../../contexts/CounterContext";
// import { SettingContext } from "../../../contexts/SettingContext";
// import { ProductCountContext } from "../../../contexts/ProductCountContext";
// import { NumberOfItemsContext } from "../../../contexts/NumberOfOrders";

// export default function Navbar({ isHome }) {
//   const { setSiteName, setLogo } = useContext(SettingContext);
//   const { counter } = useContext(CounterContext);
//   const { productCount, setProductCount } = useContext(ProductCountContext);
//   const { numberOfItems } = useContext(NumberOfItemsContext);

//   const siteNN = JSON.parse(localStorage.getItem("siteName"));
//   const logoNN = JSON.parse(localStorage.getItem("logo"));
//   console.log("counteeeer", counter);
//   useEffect(() => {
//     setSiteName(siteNN);
//     setLogo(logoNN);
//   }, []);

//   return (
//     <>
//       <nav
//         className={`sm:bg-blue-100 ${
//           isHome
//             ? "lg:bg-transparent lg:text-white"
//             : "lg:bg-[#fafbfc] lg:text-[#000e1c]"
//         } shadow-lg sm:text-blue-950 text-2xl px-8 py-7 font-semibold  text-white
//      mb-20  mx-auto  ${!isHome ? "lg:bg-[#000e1c]" : ""}`}
//       >
//         <div className="flex sm:flex-col lg:flex-row md:justify-between md:items-center max-w-[1800px] mx-auto">
//           <Link className="flex gap-3 items-center" to="/">
//             <img src={logoNN} alt="logo" className="w-[80px] h-[70px]" />
//             <span>{siteNN}</span>{" "}
//           </Link>

//           <ul className="flex sm:flex-col lg:flex-row sm:gap-2.5 lg:gap-6 items-center">
//             <li>
//               {" "}
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/about">About Us</NavLink>
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/blog">Products</NavLink>
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/team">Team</NavLink>
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/signup">Signup</NavLink>
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/cart" className="relative">
//                 <FaCartShopping className="text-4xl" />
//                 <span className="absolute flex justify-center items-center -top-6 left-4 w-[30px] h-[30px] rounded-full border-4 border-dotted border-white">
//                   {counter}
//                 </span>
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/profile">
//                 {" "}
//                 <img
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   className="w-[70px] h-[70px] rounded-full"
//                   alt=""
//                 />
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }


import { Link, NavLink } from "react-router-dom";
import { FaCartShopping, FaBars, FaMarsAndVenus } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../../contexts/CounterContext";
import { SettingContext } from "../../../contexts/SettingContext";
import { ProductCountContext } from "../../../contexts/ProductCountContext";
import { NumberOfItemsContext } from "../../../contexts/NumberOfOrders";

export default function Navbar({ isHome }) {
  const { setSiteName, setLogo } = useContext(SettingContext);
  const { counter } = useContext(CounterContext);
  const { productCount, setProductCount } = useContext(ProductCountContext);
  const { numberOfItems } = useContext(NumberOfItemsContext);
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const siteNN = JSON.parse(localStorage.getItem("siteName"));
  const logoNN = JSON.parse(localStorage.getItem("logo"));

  useEffect(() => {
    setSiteName(siteNN);
    setLogo(logoNN);
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`${
          isHome
            ? "bg-transparent text-white lg:bg-transparent lg:text-white"
            : "bg-[#fafbfc] text-[#000e1c] lg:bg-[#fafbfc] lg:text-[#000e1c]"
        } shadow-lg px-4 sm:px-6 lg:px-8 py-4 font-semibold mb-20 mx-auto relative z-50`}
      >
        <div className="flex justify-between items-center max-w-[1800px] mx-auto">
          {/* Logo and Site Name */}
          <Link className="flex gap-3 items-center flex-shrink-0" to="/">
            <img 
              src={logoNN || "/placeholder.svg"} 
              alt="logo" 
              className="w-12 h-12 sm:w-16 sm:h-14 lg:w-[80px] lg:h-[70px]" 
            />
            <span className="text-lg sm:text-xl lg:text-2xl">{siteNN}</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                Menu
              </NavLink>
            </li>
             <li>
              <NavLink 
                to="/feedbackpage"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/team"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                Team
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
                  }`
                }
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="relative hover:text-blue-500 transition-colors duration-200">
                <FaCartShopping className="text-3xl" />
                <span className="absolute flex justify-center items-center -top-3 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full">
                  {counter}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="hover:opacity-80 transition-opacity duration-200">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                  alt="Profile"
                />
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl p-2 rounded-md hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaMarsAndVenus /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <div className={`${
            isHome
              ? 'bg-black bg-opacity-90 backdrop-blur-sm'
              : 'bg-white shadow-lg border-t'
          } mx-4 rounded-lg mt-2`}>
            <ul className="flex flex-col py-4">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-lg hover:bg-gray-100 hover:bg-opacity-10 transition-colors duration-200 ${
                      isActive ? 'text-blue-500 bg-gray-100 bg-opacity-10' : ''
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-lg hover:bg-gray-100 hover:bg-opacity-10 transition-colors duration-200 ${
                      isActive ? 'text-blue-500 bg-gray-100 bg-opacity-10' : ''
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-lg hover:bg-gray-100 hover:bg-opacity-10 transition-colors duration-200 ${
                      isActive ? 'text-blue-500 bg-gray-100 bg-opacity-10' : ''
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-lg hover:bg-gray-100 hover:bg-opacity-10 transition-colors duration-200 ${
                      isActive ? 'text-blue-500 bg-gray-100 bg-opacity-10' : ''
                    }`
                  }
                >
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-lg hover:bg-gray-100 hover:bg-opacity-10 transition-colors duration-200 ${
                      isActive ? 'text-blue-500 bg-gray-100 bg-opacity-10' : ''
                    }`
                  }
                >
                  Signup
                </NavLink>
              </li>
              
              {/* Mobile Cart and Profile */}
              <li className="border-t border-gray-200 border-opacity-20 mt-2 pt-2">
                <div className="flex items-center justify-between px-6 py-3">
                  <NavLink
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 hover:text-blue-500 transition-colors duration-200"
                  >
                    <div className="relative">
                      <FaCartShopping className="text-2xl" />
                      <span className="absolute flex justify-center items-center -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                        {counter}
                      </span>
                    </div>
                    <span>Cart</span>
                  </NavLink>
                  
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                      alt="Profile"
                    />
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 -z-10"
            onClick={closeMobileMenu}
          />
        )}
      </nav>
    </>
  );
}