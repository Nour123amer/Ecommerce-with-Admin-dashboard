import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CounterContext } from "../../contexts/CounterContext";
import Confirmation from "../../components/Confirmation/Confirmation";
import { useState } from "react";
import { NumberOfItemsContext } from "../../contexts/NumberOfOrders";
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

  const total = cartItems?.reduce((acc,item)=> acc + item.price * item.quantity ,0);
  console.log("totaaaaal => " ,total)
  return (
    <>
      {cartItems
        ? cartItems.map((item) => (
    
              <div
                className="relative flex justify-between items-center mb-6 w-3/4 mx-auto"
                key={item.id}
              >
                <img className="h-[350px]" src={item.image} alt="" />
                <div>
                  <h2 className="text-2xl mb-4">{item.name}</h2>
                  <p className="text-xl mb-2">{item.description}</p>
                  <p className="text-xl mb-2">Price: {item.price}</p>
                  <p className="text-xl mb-2">Number: {item.quantity} </p>
                  <p className="text-xl mb-4"> Sale: {item.sale} </p>
                  <button
                    onClick={() => {
                      cancelOrder(item.id);
                    }}
                    className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold cursor-pointer mr-4"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
             
     
          ))
        : <div className="text-center p-22 text-black bg-red-200">No items</div>}

         <button
                    onClick={() => {
                      navigate("/Confirmation")
                      setCartItems([])
                    }}
                    className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold cursor-pointer block ml-auto"
                  >
                    Confirm Order
                  </button>

                  
    </>
  );
}
