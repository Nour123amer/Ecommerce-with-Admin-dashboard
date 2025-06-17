// import { useEffect } from "react";
// import { useContext } from "react";
// import { useState } from "react";
// import { CiMenuFries } from "react-icons/ci";
// import { OrderContext } from "../../contexts/OrdersContext";

// export default function Orders() {
//    const {orders } = useContext(OrderContext);
 

//   return (
//     <>
//       <h2 className="text-2xl mb-8 flex gap-3">
//         <CiMenuFries className="text-[#B0C3CC] text-[32px]" />
//         Orders{" "}
//       </h2>
//       <table className="w-full">
//         <thead>
//           <tr className="p-2 border-b-2 border-gray-200 w-full">
//             <th className="w-1/7 p-6">Id</th>
//             <th className="w-1/7 p-6">User Phone</th>
//             <th className="w-1/7 p-6">Products</th>
//             <th className="w-1/7 p-6">Quantity</th>
//             <th className="w-1/7 p-6">Total</th>
//             <th className="w-1/7 p-6">Status</th>
//             <th className="w-1/7 p-6">Date</th>
//           </tr>
//         </thead>
//         <tbody style={{ fontSize: "18px" }}>
//           {orders &&
//             orders.map((order) => (
//               <tr key={order.id} className="p-6 border-b-2 border-gray-200">
//                 <td className="w-1/7 text-center p-4">{order.id}</td>
//                 <td className="w-1/7 text-center p-4">{order.phone}</td>
//                 <td className="w-1/7 text-center p-4 ">
//                   {order?.products?.map((p) => (
//                   <div key={p.id}>
//                     <p>
//                       <span className="text-blue-500">ProductId :</span>{" "}
//                       {p.productId}
//                     </p>
//                     <p>
//                       <span className="text-blue-500">Product Quantity :</span>{" "}
//                       {p.quantity}
//                     </p>
//                   </div>
//                    ))} 
//                 </td>
//                 <td className="w-1/7 text-center p-4">
//                 {order.products?.reduce((acc,item) => acc + item.quantity , 0)}
//                 </td>
//                 <td className="w-1/7 text-center p-4">
                
//                 {order.total}</td>
//                 <td
//                   className={`${
//                     order.status === "completed"
//                       ? "text-green-700"
//                       : "text-orange-500"
//                   } w-1/7 text-center p-4`}
//                 >
//                   {order.status}
//                 </td>
//                 <td className="w-1/7 text-center p-4">{order.date}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </>
//   );
// }


"use client"

import { useEffect, useContext, useState } from "react"
import { CiMenuFries } from "react-icons/ci"
import { OrderContext } from "../../contexts/OrdersContext"

export default function Orders() {
  const { orders } = useContext(OrderContext)
  const [productsData, setProductsData] = useState({})

  // Fetch product details to get prices
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!orders) return

      const productIds = new Set()
      orders.forEach((order) => {
        order.products?.forEach((product) => {
          productIds.add(product.productId)
        })
      })

      const productDetails = {}
      for (const productId of productIds) {
        try {
          const res = await fetch(`http://localhost:3000/products/${productId}`)
          const product = await res.json()
          productDetails[productId] = product
        } catch (error) {
          console.error(`Failed to fetch product ${productId}:`, error)
        }
      }

      setProductsData(productDetails)
    }

    fetchProductDetails()
  }, [orders])

  // Calculate total for an order
  const calculateOrderTotal = (order) => {
    if (!order.products || !productsData) return 0

    return order.products.reduce((total, item) => {
      const product = productsData[item.productId]
      if (product && product.price) {
        return total + product.price * item.quantity
      }
      return total
    }, 0)
  }

  return (
    <>
      <h2 className="text-2xl mb-8 flex gap-3">
        <CiMenuFries className="text-[#B0C3CC] text-[32px]" />
        Orders
      </h2>
      <table className="w-full">
        <thead>
          <tr className="p-2 border-b-2 border-gray-200 w-full">
            <th className="w-1/7 p-6">Id</th>
            <th className="w-1/7 p-6">User Phone</th>
            <th className="w-1/7 p-6">Products</th>
            <th className="w-1/7 p-6">Quantity</th>
            <th className="w-1/7 p-6">Total</th>
            <th className="w-1/7 p-6">Status</th>
            <th className="w-1/7 p-6">Date</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "18px" }}>
          {orders &&
            orders.map((order) => (
              <tr key={order.id} className="p-6 border-b-2 border-gray-200">
                <td className="w-1/7 text-center p-4">{order.id}</td>
                <td className="w-1/7 text-center p-4">{order.phone}</td>
                <td className="w-1/7 text-center p-4">
                  {order?.products?.map((p) => (
                    <div key={p.id} className="mb-2">
                      <p>
                        <span className="text-blue-500">Product:</span>{" "}
                        {productsData[p.productId]?.name || `ID: ${p.productId}`}
                      </p>
                      <p>
                        <span className="text-blue-500">Quantity:</span> {p.quantity}
                      </p>
                      <p>
                        <span className="text-blue-500">Price:</span> ${productsData[p.productId]?.price || 0}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="w-1/7 text-center p-4">
                  {order.products?.reduce((acc, item) => acc + item.quantity, 0)}
                </td>
                <td className="w-1/7 text-center p-4 font-semibold">${calculateOrderTotal(order).toFixed(2)}</td>
                <td
                  className={`${
                    order.status === "completed" ? "text-green-700" : "text-orange-500"
                  } w-1/7 text-center p-4`}
                >
                  {order.status}
                </td>
                <td className="w-1/7 text-center p-4">{order.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
