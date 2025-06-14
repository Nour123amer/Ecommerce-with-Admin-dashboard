import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SettingContext } from '../../contexts/SettingContext'

export default function Sidebar() {
  const {siteName} = useContext(SettingContext);
  return (
    <>
    <div className='flex flex-col bg-[#F1F2F7] text-white  py-5 fixed top-0 left-0 bottom-0 w-[350px] '>
        <div className='mt-3 border-b-2 border-[#C8CBD9]'>
            <Link to="" className='text[#5A67BA] flex justify-center items-center gap-1 mb-4.5'><div className='w-[30px] h-[30px] text-white bg-[#5A67BA] rounded-full flex justify-center items-center'>G</div> {siteName}</Link>
        </div>
      
        <ul className='w-1/2 flex flex-col gap-5 py-10 px-8 text-blue-900'>
            <li><NavLink className="mb-4 text-xl font-semibold" to="dashboard">Dashboard</NavLink></li>
                <li><NavLink className="mb-4 text-xl font-semibold" to="orders">Food Orders</NavLink></li>
             <li><NavLink className="mb-4 text-xl font-semibold" to="products">Products</NavLink></li>
              <li><NavLink className="mb-4 text-xl font-semibold" to="users">Users</NavLink></li>
                  <li><NavLink className="mb-4 text-xl font-semibold" to="control">Control</NavLink></li>
              <li><NavLink className="mb-4 text-xl font-semibold" to="feedback">Feedback</NavLink></li>
            <li><NavLink className="mb-4 text-xl font-semibold" to="setting">Setting</NavLink></li>
            {/* <li><NavLink to="/lifeCycle">Contact</NavLink></li>
            <li><NavLink to="/Parent">anything</NavLink></li> */}
        </ul>

    </div>
    </>
  )
}
