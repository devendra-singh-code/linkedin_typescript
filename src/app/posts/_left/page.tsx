import { Bookmark, Calendar, GroupIcon } from 'lucide-react'
import React from 'react'

const Left = ({user}: {user: any}) => {

  return (
  <div className="flex flex-col gap-3">
      <div className=" bg-white rounded-xl overflow-hidden border border-gray-300 ">
        <div className=" relative h-16 ">
          {user?.cover_image ? (
            <img src={user.cover_image} className='w-full h-full object-cover overflow-hidden' alt="" />
          ) : (
            <div className='bg-gray-400 h-full w-full'></div>
          )}
          <div className=" absolute top-8  left-6 h-16  flex items-center justify-center w-16 bg-green-600 rounded-full border-2 border-white">
            {user?.profile_image ? (
              <img src={user.profile_image} className='w-16 h-16 object-cover rounded-full' alt="" />
            ) : (
            <p className="text-[30px] text-white">{user?.full_name.charAt(0)}</p>
            )}
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col mt-10">
          <p className="text-xl font-semibold text-gray-8">{user.full_name}</p>
          <p className="text-[12px] text-gray-900">Web Developer</p>
          <p className="text-[12px] text-gray-500">Bhopal, Madhya Pradesh</p>
       
        </div>
      </div>
     

      
    </div>
  )
}

export default Left
