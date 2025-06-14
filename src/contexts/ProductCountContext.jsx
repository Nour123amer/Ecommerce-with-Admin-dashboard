import { useState } from "react";
import { createContext } from "react";

export const ProductCountContext = createContext();


export function ProductCountContextProvider ({children}){
      const [productCount ,setProductCount] = useState(0);


      return(
        <>
        <ProductCountContext.Provider value={{productCount ,setProductCount}}>
            {children}
        </ProductCountContext.Provider>
        
        </>
      )
}
