import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export function CartContextProvider({children}){
    const[cartItems ,setCartItems] = useState(()=>{
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(()=>{
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },[cartItems])

    return(
        <CartContext.Provider value={{cartItems ,setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}