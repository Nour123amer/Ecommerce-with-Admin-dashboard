import { createContext, useState } from "react";

export const ThemeColorContext = createContext();

export function ThemeColorContextProvider({children}){
     const [themeColor ,setThemeColor] = useState("bg-white");
     const modeColor = localStorage.setItem("themeColor",JSON.stringify(themeColor)); 
    return(
        <ThemeColorContext.Provider value={{themeColor ,setThemeColor}}>
            {children}
        </ThemeColorContext.Provider>
    )
}
