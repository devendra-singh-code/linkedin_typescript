"use client";
import { ArrowBigDownDash, Calendar1, Clock, ImageDown, ImageDownIcon, Loader2, NotebookPen, Plus, Video, X, Youtube } from "lucide-react";
import React, { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import axios from "axios";
import { LinkedInContext } from "@/context/linkedInContext";
import { useRouter } from "next/navigation";
import LoadingPage from "./loading";


const page = () => {
  
  const { user, allPost, setAllPost, singleUserPost } = useContext(LinkedInContext);
  const [addPost, setAddPost] = useState(false);
  const [showLooking, setShowLooking] = useState(true);

  const [image, setImage] = useState<any>(null);
  const [content, setContent] = useState<any>("");
// console.log("image", image)
  const handlePost = async (e: any) => {
    // if (!content.trim()) return;
    const newPostAdd = {
      content: content,
      createdBy: {
        full_name: user.full_name,
        profile_image: user.profile_image,
        _id: user._id
      },
  post_image: image?.type?.startsWith("image/") ? URL.createObjectURL(image) : null,
  post_video: image?.type?.startsWith("video/") ? URL.createObjectURL(image) : null,
    }
    setAllPost([newPostAdd, ...allPost])
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", image)
    formData.append("content", content)

    try {
      const response = await axios.post('/api/addUserPost', formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        // ✅ Revalidate & refetch server data
        setAddPost(false)
      }
    } catch (error) {
      console.log("error in add post page", error)
    }
  }


  return (
    <>
      {/* {addPost && <AddPost setAddPost={setAddPost} />} */}
      <div className="flex flex-col gap-3">
        {showLooking && (
          <div className=" relative px-4 py-4 bg-white rounded-xl flex flex-col gap-3 justify-center dark:bg-[#2b2b2b] dark:text-white  ">
            <Image className="w-[160px] m-auto" src={assets.one} alt="" />
            <p className="text-xl font-semibold text-center">
              Hi Devendra, are you looking for a job right now?
            </p>
            <p className="text-gray-700 text-center dark:text-white">
              Your response is only visible to you.
            </p>
            <div className="flex gap-2">
              <button className=" p-[6px] text-blue-700 dark:text-blue-400 font-semibold border-2 border-blue-300 hover:border-blue-500 hover:border-2 hover:bg-blue-50 rounded-full w-full cursor-pointer dark:hover:bg-blue-500 dark:hover:text-white">
                Yes
              </button>
              <button className=" border-2 text-blue-700 dark:text-blue-400  font-semibold border-blue-300 hover:border-blue-500 hover:border-2 hover:bg-blue-50 rounded-full w-full cursor-pointer dark:hover:bg-blue-500 dark:hover:text-white">
                No, but I am open
              </button>
            </div>
            <div
              onClick={() => setShowLooking(false)}
              className="absolute right-6 top-3"
            >
              <p className="font-semibold text-xl text-gray-600 cursor-pointer dark:text-white">
                x
              </p>
            </div>
          </div>
        )}

        {/* Add a post  */}
        <div className="px-4 py-4  rounded-xl flex flex-col gap-3 border border-gray-300">
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

              className="border border-blue-700 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full w-full flex items-center pl-6 cursor-pointer dark:hover:text-white"
            >
              <p onClick={() => setAddPost(true)} className="text-gray-600 text-[12px] md:text-[14px] font-semibold  ">
                Start a post, try writing with AI
              </p>


              {addPost &&
                <div className=" fixed z-110 top-0 left-0 bottom-0  w-full h-screen bg-black/80  flex items-center justify-center p-2 ">
                  <div className="relative bg-white h-[80vh] p-5 rounded-2xl md:w-[60%] w-full flex flex-col justify-between gap-5 dark:bg-[#2b2b2b]">
                    <div>
                      <div
                        onClick={() => setAddPost((prev: any) => !prev)}
                        className="absolute right-6 top-4 cursor-pointer"
                      >
                        <X className="font-semibold text-2xl dark:text-white" />
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
                          {user?.profile_image ? (
                            <img src={user.profile_image} className="w-full h-full object-cover overflow-hidden" alt="" />
                          ) : (

                            <p className="md:text-[22px] text-base text-white">{user?.full_name.charAt(0)}</p>
                          )}
                        </div>
                        <div className="flex flex-col ">
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-semibold text-gray-700 dark:text-white">
                              {" "}
                              {user?.full_name}
                            </p>
                            <ArrowBigDownDash className="w-4 h-4" />
                          </div>
                          <p className="text-sm dark:text-white">Post to Anyone</p>
                        </div>
                      </div>
                      <div className="w-full  mt-5  rounded-lg">
                        <textarea
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full h-40 resize-none p-2 focus:border-none focus:outline-none"
                          placeholder="What do you want to talk about?"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      {/* Images  */}
                      {image && image.type === "image/jpeg" && (
                        <div className="flex flex-wrap my-4 gap-2">
                          <div className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              className="h-20 rounded-md "
                            />
                            <div
                              onClick={() => setImage(null)}
                              className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
                            >
                              <X className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      {image && image.type.startsWith("video/") && (
                        <div className="flex flex-wrap my-4 gap-2">
                          <div className="relative group">
                            <video
                              src={URL.createObjectURL(image)}
                              controls
                              className="h-20 rounded-md "
                            />
                            <div
                              onClick={() => setImage(null)}
                              className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
                            >
                              <X className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex  gap-10 items-center">
                        <Youtube className="h-5 w-5 text-gray-500 cursor-pointer dark:text-white" />
                        <label htmlFor="image">
                          <ImageDownIcon className="h-5 w-5 text-gray-500 cursor-pointer dark:text-white" />
                          <input
                            id="image"
                            type="file"
                            accept="image/*, video/*"
                            hidden
                            onChange={(e: any) => setImage(e.target.files[0])}
                          />
                        </label>
                        <Calendar1 className="h-5 w-5 text-gray-500 cursor-pointer dark:text-white" />
                        <Plus className="h-5 w-5 text-gray-500 cursor-pointer dark:text-white" />
                      </div>
                      <div className="flex w-full items-center justify-end gap-3">
                        <Clock className="cursor-pointer h-5 w-5 dark:text-white" />
                        <button onClick={handlePost} className="px-5 py-1.5 rounded-sm hover:bg-blue-800 text-base text-gray-200 font-semibold cursor-pointer bg-blue-600">
                          Post 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }


            </div>
          </div>
          <div className="flex justify-between px-8 py-2 ">
            <div className="flex items-center gap-1 cursor-pointer">
              <ImageDown className="md:h-5 md:w-5 h-4 w-4 text-blue-700" />
              <p className="text-sm font-semibold text-gray-700 dark:text-white">Photo</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <Video className="h-5 w-5 text-blue-700" />
              <p className="text-sm font-semibold text-gray-700 dark:text-white">Video</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <NotebookPen className="md:h-5 md:w-5 h-4 w-4 text-blue-700" />
              <p className="text-sm dark:text-white font-semibold text-gray-700">
                Write articles
              </p>
            </div>
          </div>
        </div>

        {/* User posts  */}

        <div className="flex flex-col gap-2 ">
          {allPost.map((post: any, i: any) => (
            <Posts key={i} posts={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
