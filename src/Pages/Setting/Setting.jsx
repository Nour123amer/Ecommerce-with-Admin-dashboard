import { useContext, useEffect } from "react";
import { SettingContext } from "../../contexts/SettingContext";
import { IoToggleSharp } from "react-icons/io5";
import { useFormik } from 'formik';
export default function Setting() {
  const { siteName, setSiteName, location , setLocation, logo ,setLogo } =
    useContext(SettingContext);

    const handleSubmit = async (values, { setSubmitting }) =>{
      try{
        localStorage.setItem("siteName" ,JSON.stringify(values.siteName));
        localStorage.setItem("location" ,JSON.stringify(values.location));
        localStorage.setItem("logo" ,JSON.stringify(values.logo));
      setSiteName(values.siteName);
      setLocation(values.location);
      setLogo(values.logo);
      }catch(error){

        console.log(error)
      }

      
    }

 
    const formik = useFormik({
      initialValues:{
        siteName,
        logo,
        location,
      },
      onSubmit:handleSubmit,
      enableReinitialize: true,
    });



  return (
    <>
      <h2 className="text-2xl mb-6"> General Setting</h2>
      <form onSubmit={formik.handleSubmit} className="bg-gray-50 p-8 px-12 rounded-md h-[710px] ">
        <div className="py-6 flex justify-between items-center px-5">
          <p className="text-gray-600 text-lg">Site Name</p>
          <input
            name="siteName"
            onChange={formik.handleChange}
            value={formik.values.siteName}
            className="w-1/5 px-3 py-2 bg-white "
            type="text"
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center px-5">
          <p className="text-gray-600 text-lg">Logo</p>
          <input
            value={formik.values.logo}
            name="logo"
            onChange={formik.handleChange}
            className="w-1/5 px-3 py-2 bg-white "
            type="text"
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 px-5">
          <p className="text-gray-600 text-lg mb-4">Payment Methods : </p>
          <div className=" flex gap-12 items-center">
            <div className="w-1/5 px-3 py-2 ">
              <input
                className="mr-2"
                id="cash"
                value="Cash"
                name="cash"
                type="checkbox"
                checked
              />
              <label className="text-lg" htmlFor="cash">
                Cash
              </label>
            </div>

            <div className="w-1/5 px-3 py-2 ">
              <input
                className="mr-2"
                name="credit-card"
                value="Credit Card"
                id="credit-card"
                type="checkbox"
              />
              <label className="text-lg" htmlFor="">
                Credit Card
              </label>
            </div>

            <div className="w-1/5 px-3 py-2 ">
              <input
                className="mr-2"
                name="Pay-pal"
                id="Pay-pal"
                value="Pay-Pal"
                type="checkbox"
              />
              <label className="text-lg" htmlFor="Pay-pal">
                Pay-Pal
              </label>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center px-5">
          <p className="text-gray-600 text-lg">Roles & Permissions</p>
          <input
            value="Admin"
            className="w-1/5 px-3 py-2 bg-white "
            type="tel"
            name="phone"
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center px-5">
          <p className="text-gray-600 text-lg">Notification</p>
          {/* <input name="role" className="w-1/5 px-3 py-2 bg-white " type="text" /> */}
          <IoToggleSharp className="text-4xl text-green-700 " />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center px-5 mb-8">
          <p className="text-gray-600 text-lg">Location</p>
          <input
            value={formik.values.location}
            className="w-1/5 px-3 py-2 bg-white "
            name="location"
            onChange={formik.handleChange}
            type="text"
          />
        </div>

         <button
          type="submit"
          className="px-5 py-2.5 bg-blue-500 text-white rounded-md block ml-auto text-xl cursor-pointer"
        >
          Save Change
        </button> 


     </form>
    </>
  );
}
