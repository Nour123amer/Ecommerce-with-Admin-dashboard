import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export function UserContextProvider({children}){
 const [users, setUsers] = useState([]);

  async function getUsers() {
    let res = await fetch("http://localhost:3000/users");
    let data = await res.json();
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

    return(
        <>
        <UserContext.Provider value={{users}}>
           {children}
        </UserContext.Provider>
        </>
    )
}