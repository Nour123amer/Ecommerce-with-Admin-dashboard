import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

export default function Control() {
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

  const handleSubmit = async (values) => {
    await addProduct(
      values.image,
      values.name,
      values.price,
      values.description
    );
    toast.success("Product added successfully.");
  };

  const formik = useFormik({
    initialValues: {
      image: addedProduct?.image | "",
      name: addedProduct?.name | "",
      price: addedProduct?.price | "",
      description: addedProduct?.description | "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h2 className="text-2xl mb-6">Add Product : </h2>
      <form
        onSubmit={formik.handleSubmit}
        className=" border w-1/4 border-gray-200 h-[680px] bg-white shadow hover:shadow-md transition overflow-hidden"
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
        <input
          className={` border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-xl font-semibold `}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <br />
        <input
          className="border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-gray-600 text-sm"
          value={formik.values.description}
          name="description"
          onChange={formik.handleChange}
        />
        <br />
        <label className="p-2" htmlFor="">
          Product Price :{" "}
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
          className="bg-green-600 text-white rounded-md px-3 py-1 mt-3 mx-2 cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </>
  );
}
