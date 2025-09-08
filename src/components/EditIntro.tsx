import { Plus, X } from 'lucide-react'
import React from 'react'

const EditIntro = ({ setEditIntro }: { setEditIntro: any }) => {
    return (
        <div className=" fixed z-110 top-0 left-0 bottom-0  w-full h-screen bg-black/80  flex items-center justify-center">
            <div className="relative bg-white h-[80vh]  rounded-2xl w-[60%] flex flex-col justify-between  gap-5 ">
                <div className='w-full px-5 py-4'>
                    <p className='text-2xl font-semibold'>Edit into</p>
                    <div
                        onClick={() => setEditIntro(false)}
                        className="absolute right-6 top-4 cursor-pointer"
                    >
                        <X className="font-semibold text-2xl" />
                    </div>
                </div>

                <div className='flex flex-col gap-3 overflow-y-scroll px-5'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-700'>If you change your name, you may have to re-verify in order to keep your verification </p>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>First Name</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>Last Name</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>Additional Name</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>Headline</p>
                            <textarea rows={4} className='border border-gray-500 w-full p-1 resize-none' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold mt-5'>Current position</p>
                        <div className='cursor-pointer flex items-center gap-2'>
                            <Plus className='w-4 h-4 text-blue-600' />
                            <p className='text-blue-500 font-semibold'>Add new position</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>Industry</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />
                            <p className='text-gray-600'>Learn more about <span className='text-blue-600 font-semibold cursor-pointer'>industry options</span></p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold mt-5'>Education</p>

                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>School</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold mt-5'>Location</p>

                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>Country/Region</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />

                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] text-gray-800'>City</p>
                            <input type="text" className='border border-gray-500 w-full p-1' />

                        </div>
                    </div>
                     <div className='flex flex-col gap-2 mt-5'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-2xl font-semibold text-gray-800'>Contact info</p>
                           <p className='text-gray-600'>Add or edit your profile URL, email, and more.</p>
                        </div>
                    </div>
                </div>

                <div className='text-right px-5 py-4'>
                    <button className='bg-blue-500 px-4 rounded-sm cursor-pointer text-[14px] text-white py-2'>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditIntro
