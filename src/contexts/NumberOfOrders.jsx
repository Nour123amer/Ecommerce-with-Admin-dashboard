import { createContext } from "react";
import { useState } from "react";

export const NumberOfItemsContext = createContext();

export function NumberOfItemsContextProvider({children}){
    const [numberOfItems ,setNumberOfItems] = useState(0);

    return(
        <NumberOfItemsContext.Provider value={{numberOfItems ,setNumberOfItems}} >
            {children}
        </NumberOfItemsContext.Provider>
    )
}