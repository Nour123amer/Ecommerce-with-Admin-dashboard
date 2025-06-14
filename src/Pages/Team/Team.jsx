import React from 'react'

export default function Team() {
  return (
    <>
    <h2 className='mb-20 text-4xl text-center '>Meet Our Experts</h2>
    <div className='flex sm:flex-col sm-flex-wrap md:flex-row  justify-between items-center w-3/4 mx-auto bg-white'>

     <div className='relative mb-[280px] '>
      <img src="https://i.ibb.co/q3SrJScP/chef1-png.png" alt="" />
      <div className='absolute left-[10%] -bottom-[40%] w-3/4 h-[300px] rounded-full bg-white border border-gray-300 shadow-lg flex flex-col justify-center items-center'>
        <h3 className='font-bold text-red-500 mb-1'>Desert specialist</h3>
        <p className='text-xl font-bold'>Tomas William</p>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
        </div>

        <img src="https://i.ibb.co/pj679n6n/name-chef-png.png" alt="signature" />
      </div>
     </div>
    
      <div className='relative mb-[280px] '>
      <img src="https://i.ibb.co/rGGRTXNP/Link.png" alt="" />
      <div className='absolute left-[10%] -bottom-[40%] w-3/4 h-[300px] rounded-full bg-white border border-gray-300 shadow-lg flex flex-col justify-center items-center'>
        <h3 className='font-bold text-red-500 mb-1'>Chef master</h3>
        <p className='text-xl font-bold'>James Johnson</p>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
        </div>

        <img src="https://i.ibb.co/pj679n6n/name-chef-png.png" alt="signature" />
      </div>
     </div>

       <div className='relative mb-[280px] '>
      <img src="https://i.ibb.co/RpNp42hv/Link-1.png" alt="" />
      <div className='absolute left-[10%] -bottom-[40%] w-3/4 h-[300px] rounded-full bg-white border border-gray-300 shadow-lg flex flex-col justify-center items-center'>
        <h3 className='font-bold text-red-500 mb-1'>Desert specialist</h3>
        <p className='text-xl font-bold'>Room Minal</p>
        <div className='flex justify-center items-center gap-2 my-4'>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
          <p className='w-[30px] h-[30px] rounded-full bg-gray-300'></p>
        </div>

        <img src="https://i.ibb.co/pj679n6n/name-chef-png.png" alt="signature" />
      </div>
     </div>


    </div>
    </>
  )
}
