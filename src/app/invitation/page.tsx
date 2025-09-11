"use client"
import { LinkedInContext } from '@/context/linkedInContext'
import axios from 'axios'
import { Settings } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const { user, followers, sendRequest } = useContext(LinkedInContext)
    // console.log("invitation page ", user?.followers)
    // console.log("follow", followers)
// console.log("user", user)
    const pendingStatus = followers?.filter((stat: any) => stat.status === 'pending')
    // console.log("pending ", pendingStatus)
  
    // const acceptStatus = followers?.filter((stat: any) => stat.status === 'accept')
    // console.log("accept ", acceptStatus)

    const [show, setShow] = useState("received")

    const acceptRequest  = async (id: any) => {
    try {
      const response = await axios.post('/api/friends/acceptRequests',{senderId: id }, {withCredentials: true})
      if(response.data.success){
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.log("Error in following use", error)
    }
  }
  

    return (
        <div className='flex gap-2 flex-col p-4 border border-gray-300 rounded-md'>
            <div className='flex items-center justify-between'>
                <p>Manage invitations</p>
                <Settings className='w-5 h-5 text-gray-700 cursor-pointer' />
            </div>
            <div className='flex items-center mb-2'>
                <p onClick={() => setShow("received")} className={`w-[120px] text-center py-3 cursor-pointer border-b-2  ${show === 'received' ? 'border-green-700 text-green-800' : 'border-white'}`}>Received</p>
                <p onClick={() => setShow("sent")} className={`w-[120px] text-center py-3 cursor-pointer border-b-2  ${show === 'sent' ? 'border-green-700 text-green-800' : 'border-white'}`}>Sent</p>
            </div>
            <div className={`${show === 'received' ? 'block' : 'hidden'} flex flex-col gap-2`}>

     {pendingStatus?.map((data: any) => (
                <div key={data._id} className='flex items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                         {data?.sender?.profile_image ? (
                                <img src={data.sender.profile_image} className='w-16 h-16 rounded-full overflow-hidden object-cover' alt="" />
                            ) : (

                                <div className='h-16 w-16 rounded-full bg-gray-700 '></div>
                            )}
                        <div className='flex flex-col leading-tight'>
                            <p className='text-[12px] text-gray-700'>{data.sender.full_name}</p>
                            <p><span className='font-semibold'>aramco</span> invited to subscribe to <span className='font-semibold'>Energy to the World</span></p>
                            <p className='text-[12px] text-gray-700'>Yesterday</p>
                        </div>
                    </div>
                    <div>
                        <button className=' rounded-full px-4 py-1 text-sm font-semibold cursor-pointer border-none'>Ignore</button>
                        <button onClick={() => acceptRequest(data.sender._id)} className='text-blue-700 rounded-full px-4 py-1 text-sm font-semibold cursor-pointer border border-blue-800'>Accept</button>
                    </div>
                </div>
       ))}
            </div>
            <div className={`${show === 'sent' ? 'block' : 'hidden'} flex flex-col gap-2`}>

                {sendRequest?.map((data: any) => (

                    <div key={data._id} className='flex items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                          

                                  {data?.profile_image ? (
                                <img src={data.profile_image} className='w-16 h-16 rounded-full overflow-hidden object-cover' alt="" />
                            ) : (

                                <div className='h-16 w-16 rounded-full bg-gray-700 '></div>
                            )}
                         
                            <div className='flex flex-col leading-tight'>
                                <p className='text-[14px] font-semibold text-gray-900'>{data.full_name}</p>
                                <p className='text-[14px] text-gray-700'>Cloud Architect @ SELECCIÓN Consulting</p>
                                <p className='text-[12px] text-gray-700'>Yesterday</p>
                            </div>
                        </div>
                        <div>
                            <button className=' rounded-full px-4 py-1 text-base font-semibold text-gray-600 cursor-pointer border-none'>Withdraw</button>

                        </div>
                    </div>
                 ))} 

            </div>

        </div>
    )
}

export default page
