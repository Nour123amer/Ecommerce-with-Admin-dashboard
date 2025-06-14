import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { SettingContext } from "../../../contexts/SettingContext";

export default function Footer() {
    const {location ,setLocation} = useContext(SettingContext);
  
    useEffect(()=>{
      setLocation(JSON.parse(localStorage.getItem("location")));
    },[location])

  return (
    <>
      <div className="text-white  py-3 bg-[#000e1c] mt-14">
        <div className="flex sm:flex-col md:flex-row md:flex-wrap lg:flex-nowrap  justify-between items-center max-w-[1800px] mx-auto py-6">

          <div className="bg-[#F3274C] rounded-2xl p-6 font-semibold sm:w-full md:w-1/2 lg:w-fit sm:mb-6 ">
            <h2 className="mb-2 italic">GOODFOOD</h2>
            <p className="mb-8">FOOD & RESTAURANT</p>

            <p>Tuesday – Saturday: 12:00pm – 23:00pm</p>
            <p className="mb-6">Closed on Sunday</p>
            <p>{location}</p>
          </div>

          <div className="sm:mb-6 sm:w-full md:w-1/2 lg:w-1/4 px-6 ">
            <h2 className="mb-6 text-2xl">Quick Links</h2>
            <ul>
              <li>
                <NavLink className="text-lg" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg" to="/about">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg" to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg" to="/team">
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg" to="/signup">
                  Registration
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sm:mb-6 sm:w-full md:w-1/2 lg:w-1/4 px-6 ">
            <h2 className="mb-6 text-2xl">Menu</h2>
            <ul>
              <li>
                <NavLink className="text-lg flex gap-1 items-center" to="/">
                 <IoIosArrowForward />
                  Steak
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg flex gap-1 items-center" to="/about">
                  <IoIosArrowForward />
                  Burger
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg flex gap-1 items-center" to="/products">
                  <IoIosArrowForward />
                  Pizza
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg flex gap-1 items-center" to="/team">
                  <IoIosArrowForward />
                  Drinks
                </NavLink>
              </li>
              <li>
                <NavLink className="text-lg flex gap-1 items-center" to="/signup">
                  <IoIosArrowForward />
                  Deserts
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sm:mb-6 sm:w-full md:w-1/2 lg:w-1/3 px-6">
            <h2 className="mb-6 text-2xl">Newsletter</h2>
            <p className="mb-4">Get recent news and updates.</p>
            <input type="email" placeholder="Email Address" className="border border-gray-300 px-7 py-4 rounded-lg mb-4 w-full"/>
            <br />
            <button className="bg-[#F3274C] text-white px-5 py-3 rounded-lg">Subscribe</button>
          </div>

        </div>
      </div>
    </>
  );
}
