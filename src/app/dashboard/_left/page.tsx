import { Bookmark, Calendar, GroupIcon } from 'lucide-react'
import React from 'react'

const Left = ({user}: {user: any}) => {

  return (
  <div className="flex flex-col gap-3">
      <div className="  rounded-xl overflow-hidden border border-gray-300 ">
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
          <p className="text-xl font-semibold text-gray-8 dark:text-white">{user.full_name}</p>
          <p className="text-[12px] text-gray-900 dark:text-white">Web Developer</p>
          <p className="text-[12px] text-gray-500">Bhopal, Madhya Pradesh</p>
          <p className="bg-gray-100 p-1 pl-3 font- text-sm border-2 border-dotted rounded-md border-gray-300 mt-4 text-gray-500 cursor-pointer hover:border-2 hover:border-blue-700 hover:text-gray-800 dark:bg-gray-800">
            {" "}
            + Experience
          </p>
        </div>
      </div>
      <div className="px-4 py-3  rounded-xl border border-gray-300">
        <p className="text-[12px] text-gray-500 dark:text-white">Grow your career with Premium</p>
        <p className="text-[12px] font-semibold hover:text-blue-700 dark:text-gray-400 cursor-pointer hover:underline">Dont miss: Premium for $0</p>
      </div>
      <div className="px-4 py-3  rounded-xl border border-gray-300">
        <div className="hover:underline cursor-pointer">
          <p className="text-[12px] text-gray-500 dark:text-white">Connections</p>
          <p className="text-[12px] font-semibold dark:text-gray-400">Discovers new connections</p>
        </div>
      </div>

      <div className="px-4 py-4  rounded-xl flex flex-col gap-2 border border-gray-300 dark:text-gray-300">
        <div className="flex items-center gap-2 text-[14px] font-semibold hover:underline cursor-pointer">
        <Bookmark className="h-4 w-4  " />
          <p className="">Saved items</p>
        </div>
        <div className="flex items-center gap-2 text-[14px] font-semibold hover:underline cursor-pointer">
        <GroupIcon className="h-4 w-4" />
          <p >Groups</p>
        </div>
        <div className="flex items-center gap-2 text-[14px] font-semibold hover:underline cursor-pointer">
        <Calendar className=" h-4 w-4"  />
          <p>Events</p>
        </div>
      </div>
    </div>
  )
}

export default Left
