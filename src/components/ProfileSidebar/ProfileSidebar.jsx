import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { HiXMark } from 'react-icons/hi2'
import { IoIosArrowDropdown, IoIosArrowForward, IoIosNotifications, IoMdLogOut } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { ThemeColorContext } from '../../contexts/ThemeColorContext'

export default function ProfileSidebar() {
  const [currentUser, setCurrentUser] = useState();
  const {theme ,setTheme} = useContext(ThemeContext);
  const {themeColor ,setThemeColor} = useContext(ThemeColorContext);

  const changeTheme = ()=>{
    setTheme(!theme);
    setThemeColor("bg-black text-white")
  }

    useEffect(() => {
      const user = localStorage.getItem("currentProfileUser");
      const userDetails = localStorage.getItem("useData");
      console.log("details ", userDetails)
      console.log(user);
      setCurrentUser(JSON.parse(user));
    }, []);
  return (
    <>
       <div>
              <div className="w-[380px] h-[430px] rounded-[15px] px-4 py-8 bg-gray-50 text-gray-600 shadow-xl mb-14">
                <div className="flex gap-4 mb-6 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-[70px] h-[70px] rounded-full"
                    alt=""
                  />
                  <div>
                    <h2>{currentUser?.name}</h2>
                    <p>{currentUser?.email}</p>
                  </div>
                </div>
                <hr className="text-gray-300" />
                <div className="py-6 ">
                  <NavLink to="." end className={ ({isActive})=>` ${isActive ? "bg-gray-100":""} flex justify-between items-center mb-6 px-3 rounded-lg  py-3 `}>
                    <div className="flex gap-4 items-center">
                      <FaUser className="text-2xl" />
                      <h2 className="text-lg">My Profile</h2>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                  </NavLink>
    
                  <NavLink to="profilesetting" className={({isActive})=>` ${isActive ? "bg-gray-100":"" } flex justify-between items-center mb-6 p-3 rounded-lg  `}>
                    <div className="flex gap-4 items-center">
                      <IoSettings className="text-2xl" />
                      <h2 className="text-lg">Setting</h2>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                  </NavLink>
    
                  <NavLink to="profilenotification" className={({isActive})=>` ${isActive ?"bg-gray-100":"" } flex justify-between items-center mb-6 p-3 rounded-lg  `}>
                    <div className="flex gap-4 items-center">
                      <IoIosNotifications className="text-2xl" />
                      <h2 className="text-lg">Notification</h2>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                  </NavLink>
    
                  <NavLink to="/" className="flex justify-between items-center mb-6 px-3 ">
                    <div className="flex gap-4 items-center">
                      <IoMdLogOut className="text-2xl" />
                      <h2 className="text-lg">LogOut</h2>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                  </NavLink>
                </div>
              </div>
    
              <div className="w-[380px] h-[225px] rounded-[15px] px-4 py-6  bg-gray-50 text-gray-600 shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl">Setting</h2>
                  <HiXMark className="text-2xl" />
                </div>
                <hr className="text-gray-300" />
                <div className="py-3">
                  <div className="flex justify-between items-center px-3 rounded-lg bg-gray-100 py-3 mb-4">
                    <h2 className="text-lg">Theme</h2>
                    <div className="flex gap-4 items-center">
                      <p onClick={()=>{changeTheme()}}>{theme ? "Light" : "Dark"} </p>
                      <IoIosArrowDropdown className="text-2xl" />
                    </div>
                  </div>
    
                  <div className="flex justify-between items-center px-3 rounded-lg bg-gray-100 py-3 mb-4">
                    <h2 className="text-lg">Role</h2>
                    <div className="flex gap-4 items-center">
                      <p>{currentUser?.role} </p>
                      <IoIosArrowDropdown className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
