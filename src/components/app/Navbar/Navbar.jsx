import { Link, NavLink } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { useContext, useEffect } from 'react';
import { CounterContext } from '../../../contexts/CounterContext';
import { SettingContext } from '../../../contexts/SettingContext';


export default function Navbar({ isHome }) {
  const {siteName ,setSiteName ,logo ,setLogo} = useContext(SettingContext);
  const {counter} = useContext(CounterContext);

  useEffect(()=>{
    setSiteName(JSON.parse(localStorage.getItem("siteName")));
    setLogo(JSON.parse(localStorage.getItem("logo")));
  },[siteName])

  return (
    <>
    <nav className={`sm:bg-blue-100 ${isHome? "lg:bg-transparent lg:text-white":"lg:bg-[#fafbfc] lg:text-[#000e1c]"} shadow-lg sm:text-blue-950 text-2xl px-8 py-7 font-semibold  text-white
     mb-20  mx-auto  ${!isHome ? "lg:bg-[#000e1c]":""}`}>

      <div className='flex sm:flex-col lg:flex-row md:justify-between md:items-center max-w-[1800px] mx-auto'>
         <Link className='flex gap-3 items-center' to="/" >
         <img src={logo} alt="logo" className='w-[80px] h-[70px]' />
        <span>{siteName}</span> </Link>

       <ul className='flex sm:flex-col lg:flex-row sm:gap-2.5 lg:gap-6 items-center'>
        <li> <NavLink to="/" >Home</NavLink></li>
        <li> <NavLink to="/about" >About Us</NavLink></li>
        <li> <NavLink to="/blog" >Products</NavLink></li>
        <li> <NavLink to="/team" >Team</NavLink></li>
        <li> <NavLink to="/signup" >Signup</NavLink></li>
        <li> <NavLink to="/cart" className="relative" >
        <FaCartShopping className='text-4xl' />
         <span className='absolute flex justify-center items-center -top-6 left-4 w-[30px] h-[30px] rounded-full border-4 border-dotted border-white'>{counter}</span>
         </NavLink></li>

         <li><NavLink to="/profile" >  <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-[70px] h-[70px] rounded-full"
                alt=""
              /></NavLink></li>


       </ul>
      </div>
    </nav>
    </>
  )
}
