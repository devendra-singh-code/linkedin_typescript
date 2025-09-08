import React from 'react'
import { assets } from '../../../../assets/assets'
import Image from 'next/image'
import { ArrowDownLeftFromSquareIcon } from 'lucide-react'

const Followers_Right = () => {
  return (
   <div>
      <div className="bg-white rounded-xl overflow-hidden">
        <div className='relative w-full h-16 bg-gray-400'>
          <div className='absolute top-6 left-5'>

          <Image className='w-20'  src={assets.sbi} alt="" />
          </div>
          <div className='absolute bg-white flex top-2 right-2 rounded-full items-center px-4 py-1 gap-2 text-sm'>
            <p>Promoted</p>
            <ArrowDownLeftFromSquareIcon className='h-4 w-4' />
          </div>
        </div>
        <div className='mt-10 p-4 flex flex-col gap-3'>
          <p className='font-semibold'> State Bank of India</p>
          <p className='text-sm'>Devendra, you might like to follow <span className='font-semibold'>State Bank of India</span></p>
          <div className='flex flex-col gap-3'>
            <p className='text-sm'>Keep up with interesting, relevant updates</p>
            <button className='bg-blue-500 w-full rounded-full text-white py-2'>Follow</button>
          </div>
        </div>
      </div>
      <div>
      <div className='px-4 py-4 flex flex-wrap gap-2 items-center justify-center rounded-xl'>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>About</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Accessibilty</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Accessibilty</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Help Center</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Privacy & Terms</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Ad Choice</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Advertising</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900 '>Business Service</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>Get the linkedIn app</p>
      <p className='text-[12px] font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900'>More</p>
    </div>
    <div className='px-4 rounded-xl flex items-center gap-2'>
      <Image className='w-20' src={assets.logo1} alt="" />
      <p className='text-[12px] font-semibold text-gray-600'>LinkedIn Corporation @ 2024</p>
    </div>
      </div>
    </div>
  )
}

export default Followers_Right
