import React from "react";
import { MdNotifications } from "react-icons/md";
import { IoIosSearch, IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <>
      <div className="w-[calc(100%-350px)]  h-[80px] px-16 py-3 fixed left-[350px] right-0 top-0 border-b-2 border-[#C8CBD9]">
        <div className="flex justify-between items-center">
          <div className="search w-1/3 relative">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search"
              className="text-[#1F384C] w-full px-3 py-2 border border-[#C8CBD9] rounded-[10px] bg-[#F6F6FB]"
            />
            <IoIosSearch className="absolute right-3 top-2.5 text-[22px]" />
          </div>

       <div className="flex justify-between items-center w-1/10">
          <Link to="/profile" ><CgProfile className="text-[#B0C3CC] text-[32px]" /></Link> 
              <Link to="/profile/profilenotification" ><MdNotifications className="text-[#B0C3CC] text-[32px]" /></Link> 
              <Link to="/dashboard/setting" ><IoMdSettings className="text-[#B0C3CC] text-[32px]" /></Link> 
       </div>
        </div>
      </div>
    </>
  );
}
