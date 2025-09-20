"use client";
import {
  ArrowRight,
  ArrowUp,
  Camera,
  Group,
  Pen,
  Verified,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import list from "../../../../assets/list.jpg";
import ads from "../../../../assets/ads.png";
import Image from "next/image";
import ChangeProfilePhoto from "@/components/ChangeProfilePhoto";
import Header from "@/components/Header";
import EditIntro from "@/components/EditIntro";
import { LinkedInContext } from "@/context/linkedInContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const { id } = useParams();
  // console.log("id", id);
  const { user } = useContext(LinkedInContext);
  const [showProfileData, setShowProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false)
  
  // console.log("profile user ", user)

  useEffect(() => {
    const fetchUserProfile = async () => {
        setLoading(false)
      try {
        const response = await axios.get(`/api/me/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setShowProfileData(response.data.data);
          setLoading(true)
        }
      } catch (error) {
        setLoading(false)
        console.log("Error in profile id page", error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        }
      }
    };
    fetchUserProfile();
  }, []);

  return (
      <>
      <Header />
      {loading && 
      <div className="w-full">
        <div className="flex justify-center gap-3">
          <div className="w-full flex flex-col justify-center  gap-5">
            <div className="bg-white rounded-xl overflow-hidden w-full">
              <div className="bg-gray-400 h-56 relative">
                {showProfileData?.cover_image ? (
                  <img
                    src={showProfileData.cover_image}
                    className="w-full h-full object-cover overflow-hidden"
                    alt="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-100" />
                )}

                <div className="absolute top-36 left-10 border-2 border-white bg-green-600 h-32 w-32 rounded-full flex justify-center items-center">
                  {showProfileData?.profile_image ? (
                    <img
                      src={showProfileData.profile_image}
                      alt=""
                      className="rounded-full object-cover overflow-hidden w-full h-full"
                    />
                  ) : (
                    <div className="bg-white"></div>
                  )}
                </div>
              </div>
              <div className="relative p-5 mt-12 flex flex-col gap-4">
                <div>
                  <div className="flex gap-2 items-start">
                    <p className="text-2xl font-semibold">{showProfileData?.full_name}</p>
                    <div className="border-2 border-dotted border-blue-700 px-4 rounded-full text-blue-700 py-[2px] font-semibold text-[12px] md:text-sm cursor-pointer flex items-center justify-center gap-1">
                      <Verified className="h-4 w-4 md:h-5 md:w-5" />
                      <p>Add verification badge</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-semibold text-[14px] max-w-[450px] leading-tight w-full">
                    Frontend Developer | React.js | JavaScript | HTML | UI/UX
                    Enthusiast | Scalable Web Apps Expert
                  </p>
                  <p className="text-gray-500 text-sm">
                    Bhopal, Madhya Pradesh, India -{" "}
                    <span className="text-blue-700 font-semibold">
                      Contact info
                    </span>
                  </p>
                </div>
                <div className="flex items-center md:gap-4 gap-2 md:flex-nowrap flex-wrap md:text-base text-[12px]">
                  <button className="px-4 py-1 bg-blue-600 text-white rounded-full">
                    Open to
                  </button>
                  <button className="border border-blue-700 text-blue-700 rounded-full px-4 py-1 font-semibold">
                    Add profile section
                  </button>
                  <button className="border border-blue-700 text-blue-700 rounded-full px-4 py-1 font-semibold">
                    Enhance profile
                  </button>
                  <button className="border border-black rounded-full px-4 py-1 font-semibold">
                    Resources
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl md:p-6 p-4 flex flex-col gap-4">
              <div className="">
                <p className="font-semibold text-xl">Suggested for you</p>
                <p className="text-sm text-gray-500">Private to you</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg  flex flex-col gap-3 items-start">
                <div className="flex gap-3 items-center">
                  <Image className="w-16" src={list} alt="" />
                  <p className="font-semibold md:text-base text-sm">
                    Write a summary to highloght your personality or wrok
                    experience
                  </p>
                </div>
                <p className="text-gray-600 md:text-sm text-[12px]">
                  Member who include a summary recieve up to 3.9 times as many
                  profile views
                </p>
                <button className="px-5 py-1 border border-gray-700 rounded-full md:text-base text-sm">
                  Add a summary
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl md:p-6 p-4 flex flex-col gap-4 pb-3">
              <div className="">
                <p className="font-semibold text-xl">Suggested for you</p>
                <p className="text-sm text-gray-500">Private to you</p>
              </div>
              <div className="flex md:gap-10 gap-2">
                <div className="w-[300px] flex justify-center md:gap-5 gap-3">
                  <div>
                    <Group className="text-3xl" />
                  </div>
                  <div>
                    <p className="font-semibold md:text-xl text-base">
                      0 profile views
                    </p>
                    <p className="font-semibold text-gray-600 md:text-base text-sm">
                      Update your prfile to attarct viewers
                    </p>
                  </div>
                </div>
                <div className="w-[300px] flex justify-center md:gap-5 gap-3">
                  <div>
                    <ArrowUp className="text-2xl " />
                  </div>
                  <div>
                    <p className="font-semibold md:text-xl text-base">
                      0 post impressions
                    </p>
                    <p className="font-semibold text-gray-600 md:text-base text-sm">
                      Start a post to increase engagement.
                    </p>
                    <p className="font-semibold text-gray-400 md:text-base text-sm">
                      Past 7 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center justify-center  border-t border-gray-300 pt-3 cursor-pointer">
                <p className="font-semibold text-gray-500 md:text-[18px] text-sm ">
                  Show all analytics{" "}
                </p>
                <ArrowRight className="text-gray-500" />
              </div>
            </div>
            <div className="relative bg-white rounded-xl p-6 flex flex-col gap-4 pb-4">
              <div className="absolute right-8 top-6 flex items-center gap-5">
                <button className="border-2 border-blue-700 rounded-full px-4 py-1 md:text-base text-sm font-semibold text-blue-700">
                  Create a post
                </button>
                <Pen className="text-gray-600 md:h-5 md:w-5 h-4 w-4" />
              </div>
              <div className="">
                <p className="font-semibold text-xl">Suggested for you</p>
                <p className="text-sm text-gray-500">Private to you</p>
              </div>
              <div>
                <p className="font-semibold">You have not poosted yet</p>
                <p className="text-gray-600 text-sm">
                  Posts you have share will be displayed here.
                </p>
              </div>
              <Link href={`/posts/${id}`} className="flex gap-3 items-center justify-center  border-t border-gray-300 pt-3 cursor-pointer">
                <p className="font-semibold text-gray-500 text-sm md:text-[18px] ">
                  Show all activity{" "}
                </p>
                <ArrowRight className="text-gray-500" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-[400px] pt-6 flex flex-col gap-6 ">
              <div className="bg-white p-4 rounded-xl flex flex-col gap-5">
                <div className=" relative border-b border-gray-400 pb-5">
                  <div className="absolute right-2">
                    <Pen className="text-gray-600" />
                  </div>
                  <p className="font-semibold text-[18px]">Profile language</p>
                  <p className="text-gray-600 text-sm"> English</p>
                </div>
                <div className="relative">
                  <div className="absolute right-2">
                    <Pen className="text-gray-600" />
                  </div>
                  <p className="font-semibold text-[18px]">
                    Profile profile & URL
                  </p>
                  <p className="text-gray-600 text-sm">
                    www.linkedin.com/devendrasingh123
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden cursor-pointer">
                <Image src={ads} alt="" />
              </div>
              <div className="rounded-xl overflow-hidden cursor-pointer">
                <Image src={ads} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
}
      </>
    
  )
};

export default page;
