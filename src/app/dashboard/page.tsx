"use client";
import { ImageDown, NotebookPen, Video } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import axios from "axios";
import { LinkedInContext } from "@/context/linkedInContext";

const page = () => {
  const { user } = useContext(LinkedInContext);
  const [addPost, setAddPost] = useState(false);
  const [showLooking, setShowLooking] = useState(true);
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await axios.get("/api/getAllPosts", {
        withCredentials: true,
      });
      if (response.data.success) {
        setAllPost(response.data.data);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <>
      {addPost && <AddPost setAddPost={setAddPost} />}
      <div className="flex flex-col gap-3">
        {showLooking && (
          <div className=" relative px-4 py-4 bg-white rounded-xl flex flex-col gap-3 justify-center   ">
            <Image className="w-[160px] m-auto" src={assets.one} alt="" />
            <p className="text-xl font-semibold text-center">
              Hi Devendra, are you looking for a job right now?
            </p>
            <p className="text-gray-700 text-center">
              Your response is only visible to you.
            </p>
            <div className="flex gap-2">
              <button className=" p-[6px] text-blue-700 font-semibold border-2 border-blue-300 hover:border-blue-500 hover:border-2 hover:bg-blue-50 rounded-full w-full cursor-pointer">
                Yes
              </button>
              <button className=" border-2 text-blue-700 font-semibold border-blue-300 hover:border-blue-500 hover:border-2 hover:bg-blue-50 rounded-full w-full cursor-pointer">
                No, but I am open
              </button>
            </div>
            <div
              onClick={() => setShowLooking(false)}
              className="absolute right-6 top-3"
            >
              <p className="font-semibold text-xl text-gray-600 cursor-pointer">
                x
              </p>
            </div>
          </div>
        )}

        {/* Add a post  */}
        <div className="px-4 py-4 bg-white rounded-xl flex flex-col gap-3 border border-gray-300">
          <div className="flex gap-2 justify-center">
            <div className="  md:h-12 md:w-14 h-10 w-12 flex items-center justify-center  bg-green-600 rounded-full border-2 border-white overflow-hidden">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  className="w-full h-full object-cover overflow-hidden"
                  alt=""
                />
              ) : (
                <p className="md:text-[22px] text-base text-white">
                  {user?.full_name.charAt(0)}
                </p>
              )}
            </div>
            <div
              onClick={() => setAddPost(true)}
              className="border border-blue-700 hover:bg-gray-100 rounded-full w-full flex items-center pl-6 cursor-pointer"
            >
              <p className="text-gray-600 text-[12px] md:text-[14px] font-semibold  ">
                Start a post, try writing with AI
              </p>
            </div>
          </div>
          <div className="flex justify-between px-8 py-2">
            <div className="flex items-center gap-1 cursor-pointer">
              <ImageDown className="md:h-5 md:w-5 h-4 w-4 text-blue-700" />
              <p className="text-sm font-semibold text-gray-700">Photo</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <Video className="h-5 w-5 text-blue-700" />
              <p className="text-sm font-semibold text-gray-700">Video</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <NotebookPen className="md:h-5 md:w-5 h-4 w-4 text-blue-700" />
              <p className="text-sm font-semibold text-gray-700">
                Write articles
              </p>
            </div>
          </div>
        </div>

        {/* User posts  */}

        <div className="flex flex-col gap-2 ">
          {allPost.map((post, i) => (
            <Posts key={i} posts={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
