import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddProduct() {

    const [addedProduct, setAddedProduct] = useState();

  async function addProduct(image, name, price, description) {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image,
        name,
        price,
        description,
      }),
    });

    const data = await res.json();
    setAddedProduct(data);
  }

  const handleSubmit = async (values ,{resetForm}) => {
    try{
       await addProduct(
      values.image,
      values.name,
      values.price,
      values.description
    );
    toast.success("Product added successfully.");
    resetForm();
    
    }catch(error){
      toast.error("Failed to add product.")
    }
   
  };

  const formik = useFormik({
    initialValues: {
      image:  "",
      name:  "",
      price:  "",
      description:  "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
    
      <form
        onSubmit={formik.handleSubmit}
        className=" border w-1/4 border-gray-200 h-[680px] bg-white shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={formik.values.image}
          alt={formik.values.name}
          className="w-full h-[300px] object-cover rounded-md mb-4"
        />
        <label className="p-2">Image URL:</label>
        <input
          name="image"
          type="text"
          value={formik.values.image}
          onChange={formik.handleChange}
          className="border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2"
        />
        <br />
        <label htmlFor="name " className='px-4'>Product name :</label>
        <input
          className={` border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-xl font-semibold `}
          name="name"
          id='name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <br />
        <label  className='px-4' htmlFor="description">Descriotion :</label>
        <input
          className="border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-gray-600 text-sm"
          value={formik.values.description}
          name="description"
          id='description'
          onChange={formik.handleChange}
        />
        <br />
        <label className="px-4" htmlFor="">
          Product Price : 
        </label>
        <input
          className="border border-gray-200 rounded-md mb-2 mx-3 w-[40%] p-2 text-xl font-semibold"
          type="text"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <br />

        <button
          onSubmit={(e) => {
            e.preventDefault();
          }}
          type="submit"
          className="bg-green-600 text-white rounded-md px-4 py-2 mx-4 text-xl mt-3 mx-2 cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </>
  )
}
