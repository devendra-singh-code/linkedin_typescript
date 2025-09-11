"use client";
import { LinkedInContext } from "@/context/linkedInContext";
import axios from "axios";
import {
  ArrowBigDownDash,
  Calendar1,
  Clock,
  Image,
  Loader2,
  Plus,
  X,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useTransition } from "react";

const AddPost = ({ setAddPost }: { setAddPost: any }) => {
  const {user} = useContext(LinkedInContext)
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [image, setImage] = useState<any>(null);
  const [content, setContent] = useState("");

const handlePost = async (e: any) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("file", image)
  formData.append("content", content)

  try {
    const response = await axios.post('/api/addUserPost', formData ,{
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      startTransition(() => {
        router.refresh();
      });
      if(response.data.success){
          // ✅ Revalidate & refetch server data
        setAddPost(false)
      }
  } catch (error) {
    console.log("error in add post page", error)
  }
}

  return (
    <div className=" fixed z-110 top-0 left-0 bottom-0  w-full h-screen bg-black/80  flex items-center justify-center p-2">
      <div className="relative bg-white h-[80vh] p-5 rounded-2xl md:w-[60%] w-full flex flex-col justify-between gap-5">
        <div>
          <div
            onClick={() => setAddPost(false)}
            className="absolute right-6 top-4 cursor-pointer"
          >
            <X className="font-semibold text-2xl" />
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
                <p className="text-xl font-semibold text-gray-700">
                  {" "}
                  {user?.full_name}
                </p>
                <ArrowBigDownDash className="w-4 h-4" />
              </div>
              <p className="text-sm">Post to Anyone</p>
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
          {image && (
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

          <div className="flex  gap-10 items-center">
            <Youtube className="h-5 w-5 text-gray-500 cursor-pointer" />
            <label htmlFor="image">
              <Image className="h-5 w-5 text-gray-500 cursor-pointer" />
              <input
                id="image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e: any) => setImage(e.target.files[0])}
              />
            </label>
            <Calendar1 className="h-5 w-5 text-gray-500 cursor-pointer" />
            <Plus className="h-5 w-5 text-gray-500 cursor-pointer" />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <Clock className="cursor-pointer h-5 w-5" />
            <button onClick={handlePost} className="px-5 py-1.5 rounded-sm hover:bg-blue-800 text-base text-gray-200 font-semibold cursor-pointer bg-blue-600">
              Post  {isPending ? <Loader2 className="w-4 h-4 animate-spin"  /> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
