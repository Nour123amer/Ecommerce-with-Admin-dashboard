
import { useState } from "react";
import { MdCancel } from "react-icons/md";
export default function Confirmation() {
    const [isClicked ,setIsClicked] = useState(false)
  return (
    <>
      <div className={`sm:w-[95%] mx-auto md:w-[50%] relative
      lg:w-[25%] bg-[url('https://i.pinimg.com/736x/70/34/99/7034992fa1528ac59db02382f6c70478.jpg')] rounded-xl text-white py-5 ${isClicked ? "hidden" :"block"}`}>
        <h2 className="text-center mb-4 text-xl py-3">Order Confirmation</h2>
        <MdCancel 
        onClick={()=>{setIsClicked(true)}}
        className="absolute top-5 right-3 text-4xl text-white "/>
        <form className="flex flex-col p-4">
          <label className="mb-1" htmlFor="name">Name:</label>
          <input
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="text"
            name="name"
          />
          <label className="mb-1" htmlFor="phone">Phone Number:</label>
          <input
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="tel"
            name="phone"
          />
          <label className="mb-1" htmlFor="address">Address:</label>
          <input
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="text"
            name="address"
          />

          <button className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black font-bold">Confirm</button>
        </form>
      </div>
    </>
  );
}
