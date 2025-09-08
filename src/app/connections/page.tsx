"use client"
import { ArrowDown, Eclipse, Ellipsis, Settings } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {

  return (
    <div className='flex gap-4 flex-col p-4 border border-gray-300 rounded-md'>
    <div className='flex items-center justify-between'>
        <p>Connections</p>
        <Settings className='w-5 h-5 text-gray-700 cursor-pointer' />
    </div>
    <div className='flex items-center justify-between mb-2'>
       <div>
        <p className='text-sm text-gray-700 flex items-center gap-2'>Sort by: <span className='font-semibold'>Recently added</span> <ArrowDown className='w-3 h-3' /> </p>
       </div>
       <div className='flex items-center gap-2'>
        <input type="text" className='border border-gray-600 py-1 px-4' placeholder='serach by name'/>
        <p className='text-blue-700 text-sm'>Search with filters</p>
       </div>
    </div>

   <div className='flex items-center justify-between'>

        <div className='flex gap-2 items-center '>
            <div className='h-14 w-14 bg-gray-700 rounded-full'></div>
            <div className='flex flex-col leading-tight cursor-pointer'>
                <p className='text-[16px] text-gray-900 hover:underline'>Piyush Garg</p>
                <p className='text-[14px] text-gray-700'>Building Teachyst - Platform for educators and creators | YouTuber | Educator</p>
                <p className='text-[12px] text-gray-700'>Connected 1 week ago</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <button className=' rounded-full px-5 py-1 text-base font-semibold cursor-pointer border border-blue-800 text-blue-600'>Mesaage</button>
            <Ellipsis className='w-4 h-4' />
        </div>
   </div>
   


    </div>
  )
}

export default page
