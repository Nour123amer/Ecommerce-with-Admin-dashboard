import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { OrderContext } from "../../contexts/OrdersContext";
import toast from "react-hot-toast";
import { NumberOfItemsContext } from "../../contexts/NumberOfOrders";
import { CartContext } from "../../contexts/CartContext";
import { data } from "react-router-dom";
export default function Confirmation() {
  const [isClicked, setIsClicked] = useState(false);
  const { setOrders } = useContext(OrderContext);
  const { numberOfItems } = useContext(NumberOfItemsContext);
  const { cartItems ,setCartItems } = useContext(CartContext);
  const today = new Date().toISOString().split("T")[0];


  console.log(cartItems)
  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log("totaaaaal => ", total);

  async function addOrder(name, phone, address, status, quantity, total ,date) {
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address,
        status,
        total,
        quantity,
        date
      }),
    });

    let data = await res.json();
    setOrders((prev) => [...prev ,data]);
  }

  const handleSubmit = async (values) => {
    try {
      await addOrder(
        values.name,
        values.phone,
        values.address,
        values.status,
        numberOfItems,
        total,
        today
      );
      toast.success("Order add successfully!");
      // setCartItems([]);
    } catch (error) {
      console.log(error)
      toast.error("Failed to add order");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      status: "pending",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div
        className={`sm:w-[95%] mx-auto md:w-[50%] relative
      lg:w-[25%] bg-[url('https://i.pinimg.com/736x/70/34/99/7034992fa1528ac59db02382f6c70478.jpg')] rounded-xl text-white py-5 ${
        isClicked ? "hidden" : "block"
      }`}
      >
        <h2 className="text-center mb-4 text-2xl py-3">Order Confirmation</h2>
        <MdCancel
          onClick={() => {
            setIsClicked(true);
          }}
          className="absolute top-5 right-3 text-4xl text-white "
        />
        <form onSubmit={formik.handleSubmit} className="flex flex-col p-4">
          <label className="mb-1" htmlFor="name">
            Name:
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="text"
            name="name"
          />
          <label className="mb-1" htmlFor="phone">
            Phone Number:
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="tel"
            name="phone"
          />
          <label className="mb-1" htmlFor="address">
            Address:
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.address}
            className="mb-3 border border-gray-300 rounded-md px-3 py-2"
            type="text"
            name="address"
          />

          <button className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black font-bold">
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}
