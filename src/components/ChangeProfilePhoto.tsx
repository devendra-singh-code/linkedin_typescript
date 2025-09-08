"use client"
import axios from 'axios'
import { Camera, Image, Pen, Recycle, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ChangeProfilePhoto = ({ setProfilePhotoChange }: { setProfilePhotoChange: any }) => {

    const [image, setImage] = useState<any>(null)

    const profilePhotoUpload = async () => {
        try {
            const formdata = new FormData()
            formdata.append("file", image)
            const response = await axios.post('/api/userProfilePhoto', formdata, {withCredentials: true})
            if(response.data.success){
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log("Error in change profile photo page", error)
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data?.message)
            }
        }
    }

    return (
        <div className=" fixed z-110 top-0 left-0 bottom-0  w-full h-screen bg-black/80  flex items-center justify-center">
            <div className="relative text-white bg-gray-950 h-[80vh] w-full md:w-[60%] md:m-0 m-3 rounded-2xl  flex flex-col justify-between gap-5">
                <X onClick={() => setProfilePhotoChange(false)} className='absolute right-5 top-5 cursor-pointer' />
                <p className='p-5 text-xl'>Profile photo</p>
                <div className='w-full flex items-center justify-center'>

                    {image &&
                        <img src={URL.createObjectURL(image)} className='w-56 h-56 rounded-full object-cover border border-white' />
                    }
                </div>
                <div className='flex items-center justify-between border-t border-white p-3 md:text-base text-sm'>
                    <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-1 flex-col md:px-4 px-2 py-2 cursor-pointer'>
                            <Pen className='h-5 w-5' />
                            <p className='font-semibold'>Edit</p>
                        </div>

                        <label id='image' className='flex items-center gap-1 flex-col md:px-4 px-2 py-2 cursor-pointer'>
                            <Camera className='h-5 w-5' />
                            <p className='font-semibold'>Upload photo</p>
                            <input type="file" accept='image/*' hidden onChange={(e: any) => setImage(e.target.files[0])} />
                        </label>
                        <div className='flex items-center gap-1 flex-col md:px-4 px-2 py-2 cursor-pointer'>
                            <Image className='h-5 w-5' />
                            <p className='font-semibold '>Frames</p>
                        </div>
                    </div>
                    <div onClick={profilePhotoUpload} className='flex items-center gap-1 flex-col md:px-4 px-2 py-2 cursor-pointer'>
                        <Recycle className='h-5 w-5' />
                        <p className='font-semibold'>Update</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePhoto
