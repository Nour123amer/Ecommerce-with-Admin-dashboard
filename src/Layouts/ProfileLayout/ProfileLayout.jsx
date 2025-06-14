import React from 'react'
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <>
    <div className='flex gap-14'>
    <ProfileSidebar />
  
       <div className='w-[75%] bg-gray-50 shadow-xl rounded-[15px] p-8 px-12  h-[710px] '>
         <Outlet />
       </div>
    </div>
    </>
  )
}
