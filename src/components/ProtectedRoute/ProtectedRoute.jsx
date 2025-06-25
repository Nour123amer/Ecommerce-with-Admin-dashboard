import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const email = localStorage.getItem("email");
    if( email === "kara@gmail.com" || email === "grace@gmail.com"){
      return children
    }else{
      return  <Navigate to={"/login"} />
    }

}
