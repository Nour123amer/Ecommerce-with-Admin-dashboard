import { useEffect } from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({children}){
    const [theme ,setTheme] = useState(false);

    useEffect(()=>{
            const themeValue= localStorage.setItem(("theme"),JSON.stringify(theme))
    }
    ,[])
    return(
        <ThemeContext.Provider value={{theme ,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}