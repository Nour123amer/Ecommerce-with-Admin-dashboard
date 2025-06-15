import { FiPlus } from "react-icons/fi";
import { NavLink } from 'react-router-dom'
import { MdModeEditOutline ,MdDelete ,MdDeliveryDining ,MdPending} from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";



export default function MenuSidebar() {
  return (
    <>
    <div className="flex flex-col w-1/4">
    
    <ul>
        <li>
            <NavLink to="addproduct" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <FiPlus className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>Add New Item</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="../products" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <MdModeEditOutline className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>Edit Existing Item</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="../products" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <MdDelete className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>Delete Item</span>
            </NavLink>
        </li>
    </ul>

    <ul>
        <li>
            <NavLink to="../orders" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <MdDeliveryDining className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>View Reservations</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="../products" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <GiConfirmed className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>Confirm Reservation</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="../products" className="flex gap-2 items-center mb-4 w-full text-xl text-gray-600 bg-slate-50 px-4 py-2.5 rounded-md ">
                <MdPending className="bg-white rounded-lg text-md p-1 w-[35px] h-[35px] text-gray-500 " />
                <span>Pend Reservation</span>
            </NavLink>
        </li>
    </ul>
    </div>
    
    </>
  )
}
