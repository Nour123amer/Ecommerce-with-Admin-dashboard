import React from 'react'
import Child from '../Child/Child'
import { useState } from 'react'
import LifeCycle from '../LifeCycle/LifeCycle';

export default function Parent(props) {
    let {deleteProduct ,updateProduct ,products} = props;
    
    console.log(props)


  return (
   <>
   <p className='pt-[200px]'>parent....</p>
   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, quaerat in excepturi harum ab delectus ut nostrum vel adipisci, consequuntur enim eveniet illo pariatur, veniam totam exercitationem ad aut error!</p>
  
   <p>Parent {props.userDetails} </p>
   {/* <Child c={props.userDetails} /> */}
   <div className='grid grid-cols-12 gap-3 bg-slate-200 rounded-lg p-2'>
    {products? products.map((p ,i)=>
    (
        <div key={p.id} className='col-span-3'>
            <img src={p.image} alt="" />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p>{p.price}</p>
                <button onClick={()=>{deleteProduct(p.id)}} className='bg-amber-500 rounded-md p-1'>Delete</button>
                <button onClick={()=>{updateProduct(i)}} className='bg-blue-500 rounded-md p-1'>Update</button>
            </div>
    )
    ):""}
   </div>
   {/* <LifeCycle /> */}
    </>
  )
}
