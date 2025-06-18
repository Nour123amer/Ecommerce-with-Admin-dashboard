"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useContext, useState } from "react"
import { MdCancel } from "react-icons/md"
import { OrderContext } from "../../contexts/OrdersContext"
import toast from "react-hot-toast"
import { NumberOfItemsContext } from "../../contexts/NumberOfOrders"
import { CartContext } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom"

export default function Confirmation() {
  const [isClicked, setIsClicked] = useState(false)
  const { setOrders } = useContext(OrderContext)
  const { setNumberOfItems } = useContext(NumberOfItemsContext)
  const { cartItems, setCartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const today = new Date().toISOString().split("T")[0]

  const total = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0)

  async function addOrder(name, phone, address, status, products, total, date) {
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address,
        status,
        total,
        products: products.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        date,
      }),
    })

    const data = await res.json()
    setOrders((prev) => [...prev, data])
    return data
  }

  const handleSubmit = async (values) => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty!")
        return
      }

      await addOrder(values.name, values.phone, values.address, values.status, cartItems, total, today)

      toast.success("Order placed successfully!")

      // Clear cart and reset states
      setCartItems([])
      setNumberOfItems(1)

      // Navigate to success page or orders
      setTimeout(() => {
        navigate("/orders")
      }, 2000)
    } catch (error) {
      console.log(error)
      toast.error("Failed to place order")
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      status: "pending",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: handleSubmit,
  })

  if (isClicked) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems?.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 text-xl font-bold">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Confirmation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <h2 className="text-center mb-6 text-2xl font-bold">Order Confirmation</h2>
          <MdCancel
            onClick={() => setIsClicked(true)}
            className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700 cursor-pointer"
          />

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Full Name *
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
              {formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                Phone Number *
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
              />
              {formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                Delivery Address *
              </label>
              <textarea
                onChange={formik.handleChange}
                value={formik.values.address}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                name="address"
                rows="3"
                placeholder="Enter your complete delivery address"
              />
              {formik.errors.address && <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-semibold text-lg transition-colors"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
