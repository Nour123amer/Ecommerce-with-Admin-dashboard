import { useEffect } from "react";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  async function getOrders() {
    let res = await fetch("http://localhost:3000/orders");
    let data = await res.json();
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h2 className="text-2xl mb-8 flex gap-3">
        <CiMenuFries className="text-[#B0C3CC] text-[32px]" />
        Orders{" "}
      </h2>
      <table className="w-full">
        <thead>
          <tr className="p-2 border-b-2 border-gray-200 w-full">
            <th className="w-1/7 p-6">Id</th>
            <th className="w-1/7 p-6">User Id</th>
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
                <td className="w-1/7 text-center p-4">{order.userId}</td>
                <td className="w-1/7 text-center p-4 ">
                  {order?.products?.map((p) => (
                  <>
                    <p>
                      <span className="text-blue-500">ProductId :</span>{" "}
                      {p.productId}
                    </p>
                    <p>
                      <span className="text-blue-500">Product Quantity :</span>{" "}
                      {p.quantity}
                    </p>
                  </>
                   ))} 
                </td>
                <td className="w-1/7 text-center p-4">
                {order.products?.reduce((acc,item) => acc + item.quantity , 0)}
                </td>
                <td className="w-1/7 text-center p-4">{order.total}</td>
                <td
                  className={`${
                    order.status === "completed"
                      ? "text-green-700"
                      : "text-orange-500"
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
  );
}
