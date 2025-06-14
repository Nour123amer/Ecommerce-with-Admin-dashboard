import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileNotification() {
  return (
    <>
    <h2 className='text-2xl mb-8'>Notification</h2>
    <div className='flex gap-8 items-center mb-4'>
      <img src="https://www.w3schools.com/howto/img_avatar2.png" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>We released some new products.</p>
        <Link className='text-lg text-[#047790]' to="/blog" >Check them out!</Link>
      </div>
    </div>
    <hr className='text-gray-300' />

    <div className='flex gap-8 items-center my-3'>
      <img src="https://img.freepik.com/free-vector/cute-male-courier-delivery-package-with-motorcycle-cartoon-vector-icon-illustration-people-job_138676-5708.jpg?semt=ais_hybrid&w=740" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>Your ordered is confirmed.</p>
        <Link className='text-lg text-[#047790]' to="/cart" >see your order details!</Link>
      </div>
    </div>
    <hr className='text-gray-300' />

    <div className='flex gap-8 items-center my-3'>
      <img src="https://st3.depositphotos.com/1688079/17319/i/450/depositphotos_173190786-stock-photo-reviews-prime-cyan-blue-banner.jpg" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>Please leave a review for your order after arrival.</p>
        <Link className='text-lg text-[#047790]' to="/about" >see reviews</Link>
      </div>
    </div>
    <hr className='text-gray-300' />

     <div className='flex gap-8 items-center my-3'>
      <img src="https://cdn1.iconfinder.com/data/icons/ui-5/502/account-512.png" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>We received your feedback ,thanks for your concern. </p>
        <Link className='text-lg text-[#047790]' to="/about" >see reviews</Link>
      </div>
    </div>
    <hr className='text-gray-300' />

     <div className='flex gap-8 items-center my-3'>
      <img src="https://img.freepik.com/free-psd/delicious-healthy-fast-food_23-2149158464.jpg?semt=ais_hybrid&w=740" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>Big Sale on your favorites. </p>
        <Link className='text-lg text-[#047790]' to="/productssale" >Sale</Link>
      </div>
    </div>
    <hr className='text-gray-300' />

         <div className='flex gap-8 items-center my-3'>
      <img src="https://cdn3d.iconscout.com/3d/premium/thumb/red-velvet-cake-3d-icon-download-in-png-blend-fbx-gltf-file-formats--dessert-food-and-restaurant-pop-sweet-pack-drink-icons-9968179.png?f=webp" className='w-[70px] h-[70px] rounded-full' alt="" />
      <div>
        <p className='text-lg'>New deserts added. </p>
        <Link className='text-lg text-[#047790]' to="/desserts" >Ckeck them.</Link>
      </div>
    </div>
   


    </>
  )
}
