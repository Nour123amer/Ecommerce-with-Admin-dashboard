import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'


export default function LifeCycle() {
    const [count ,setCount] = useState(0);
    useEffect(()=>{
        // let x = setInterval(()=>{ console.log("seti")},1000);
        console.log("Component did Mount");

        return ()=>{
         
        // clearInterval(x);
        //    console.log("Component DidUnMount...")
        // 
        }
    },[])
  return (
    <>
     <h2>{count}</h2>

    </>
  )
}
