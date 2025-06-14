import { useState } from "react";
import { createContext } from "react";

export const SettingContext = createContext();

export function SettingContextProvider({children}){

    const [siteName ,setSiteName] = useState("GOODFOOD");
    const [logo ,setLogo] = useState("https://i.ibb.co/VYhWMt22/download.png");
    const [notification ,setNotification] = useState(false);
    const [location ,setLocation] = useState("nasr city taha hussein 123");

    return(
        <SettingContext.Provider value={{siteName ,setSiteName ,logo ,setLogo ,notification ,setNotification ,location ,setLocation}}>
            {children}
        </SettingContext.Provider>
    )
}
