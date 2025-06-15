import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const OrderContext = createContext();

export function OrderContextProvider({children}){
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

    return(
        <OrderContext.Provider value={{orders, setOrders}}>
            {children}
        </OrderContext.Provider>
    )
}