"use client";

import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CounterContext } from "../../contexts/CounterContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { counter, setCounter } = useContext(CounterContext);
  const navigate = useNavigate();

  function cancelOrder(id) {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
    setCounter(counter - 1);
  }

  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="max-w-6xl mx-auto p-4">
          {cartItems
            .filter((item) => item?.name && item?.price && item?.image)
            .map((item) => (
              <div
                className="relative flex justify-between items-center mb-6 w-full bg-white rounded-lg shadow-md p-4"
                key={item.id}
              >
                <img
                  className="h-[200px] w-[200px] object-cover rounded-lg"
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                />
                <div className="flex-1 ml-6">
                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-xl font-semibold mb-2">
                    Price: ${item.price}
                  </p>
                  <p className="text-xl mb-2">Quantity: {item.quantity}</p>
                  <p className="text-xl font-bold text-green-600 mb-4">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => cancelOrder(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold transition-colors"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}

          {/* Total Section */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total Amount:</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/Confirmation");
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold text-lg block ml-auto transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className="text-center flex items-center justify-center text-xl p-12 text-[#47352b] bg-[#fef9c3] shadow-lg h-[300px] w-1/2 mx-auto rounded-lg">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p>No items are selected</p>
          </div>
        </div>
      )}
    </>
  );
}
