import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Network_Right = () => {
    const people = [
    {
      photo: "A",
      name: "Prafulla Pandaya",
      college: "Attended SAM College of Management",
    },
    {
      photo: "F",
      name: "Faran Aktar",
      college: "Attended Sagar College of Management",
    },
    {
      photo: "P",
      name: "Pradep Singh",
      college: "Attended RGTU College of Engginnering",
    },
    {
      photo: "A",
      name: "Ashish Kumar",
      college: "Attended Patel College of Art & Commernce",
    },
    {
      photo: "A",
      name: "Aman Prajapati",
      college: "Attend Bansal College of Enggineering",
    },
    {
      photo: "V",
      name: "Virendra Singh",
      college: "Attend Orientel College of Management",
    },
  ]
  return (
  <div className='w-full flex flex-col gap-3'>
      {/* <div className='bg-white px-4 flex gap-2 rounded-lg'>
        <p className='border-b-2 border-black px-5 py-2 font-semibold'>Grow</p>
        <p className=' px-5 py-2 font-semibold'>Catch up</p>
      </div> */}
      <div className='bg-white rounded-md'>
        <div className='p-3 flex justify-between items-center border border-gray-300'>
          <p className='font-semibold text-base'>Invites received</p>
          <Link href={`/invitation`} className='font-semibold text-gray-500 cursor-pointer text-[15px]'>Show all</Link>
        </div>
        {/* <div className='p-4 flex items-start justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>Newsletter - Weekly</p>
            <p><span className='font-semibold '>LinkedIn News India</span> invited you to subscribe to <span className='font-semibold '>Finace Wrap India</span></p>
          </div>
          <div className='flex gap-4'>
            <button className='px-4 py-1 border border-blue-500 rounded-full text-sm text-blue-700 font-semibold '>Ignore</button>
            <button className='bg-blue-500 px-4 py-1 rounded-full text-sm text-white font-semibold'>Accept</button>
          </div>
        </div> */}
      </div>
      <div className='bg-white p-4 flex flex-col gap-5 rounded-lg'>
        <div className='flex items-center justify-between'>
          <p>Suggested people for you based on your recent activity</p>
          <button>Show all</button>
        </div>
        <div className='flex flex-wrap  gap-3 items-start'>
        {people.map((item) => (
              <div key={item.name} className=' relative flex flex-col gap-4 rounded-lg w-[180px] overflow-hidden border border-gray-200'>
              <div className='absolute top-3 right-3 z-10 border border-white bg-gray-700 text-white p-1 rounded-full cursor-pointer'>
                <X className='h-4 w-4' />
                </div>
                <div className='bg-gray-400 h-14 relative'><p className='bg-green-500 w-16 h-16 rounded-full absolute flex items-center justify-center text-white top-5 left-16'>{item.photo}</p></div>
                <div className='mt-10 flex items-center justify-center flex-col'>
                  <p>{item.name}</p>
                  <p className='text-[12px] text-gray-500 text-center'>{item.college}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <p className='text-[12px] text-gray-500 text-center]'>Based on your profile</p>
                  <button className='border border-blue-700 w-full rounded-full text-blue-700 text-sm font-semibold py-1'> Connect</button>
                </div>
              </div>

        ))}
        
        </div>
      </div>
    </div>
  )
}

export default Network_Right
