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
      
        <ul className=' flex flex-col gap-5 py-10 px-8 text-blue-900'>
            <li><NavLink 
                 className={({ isActive }) =>    `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
           to="dashboard">Dashboard</NavLink></li>


                <li><NavLink   className={({ isActive }) => `block px-4 py-2 rounded-md text-base font-medium ${   
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
             to="orders">Food Orders</NavLink></li>


             <li><NavLink   className={({ isActive }) =>    `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
          to="products">Products</NavLink></li>
              <li><NavLink className={({ isActive }) =>    `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
           to="users">Users</NavLink></li>
                  <li><NavLink className={({ isActive }) =>    `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
               to="control">Control</NavLink></li>

              <li><NavLink  className={({ isActive }) =>   `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
              to="feedback">Feedback</NavLink></li>

            <li><NavLink  className={({ isActive }) =>    `block px-4 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-[#5A67BA] text-white text-xl"
                      : "text-blue-900 hover:bg-[#E0E2EB] hover:text-[#5A67BA]"
                  }`
                } 
            to="setting">Setting</NavLink></li>
         
        </ul>

    </div>
    </>
  )
}

// import React, { useContext } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { SettingContext } from '../../contexts/SettingContext'

// export default function Sidebar() {
//   const { siteName } = useContext(SettingContext)

//   return (
//     <>
//       <div className='flex flex-col bg-[#F1F2F7] text-white py-6 fixed top-0 left-0 bottom-0 w-[350px] shadow-lg'>
//         <div className='mb-6 pb-4 border-b border-[#C8CBD9]'>
//           <Link
//             to=""
//             className='text-[#5A67BA] flex justify-center items-center gap-3 text-xl font-bold'
//           >
//             <div className='w-[36px] h-[36px] bg-[#5A67BA] text-white rounded-full flex items-center justify-center text-lg'>
//               G
//             </div>
//             <span>{siteName}</span>
//           </Link>
//         </div>

//         <ul className='w-4/5 mx-auto flex flex-col gap-4'>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="dashboard"
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="orders"
//             >
//               Food Orders
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="products"
//             >
//               Products
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="users"
//             >
//               Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="control"
//             >
//               Control
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="feedback"
//             >
//               Feedback
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className="block px-4 py-2 rounded-lg text-blue-900 text-lg font-medium hover:bg-[#E0E2EB] hover:text-[#5A67BA] transition duration-200"
//               to="setting"
//             >
//               Setting
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </>
//   )
// }
