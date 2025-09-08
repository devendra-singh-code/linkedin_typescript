import {
  ArrowDownWideNarrow,
  MessageCircleMore,
  RepeatIcon,
  Send,
  SmileIcon,
  ThumbsUp,
  ImageDownIcon,
  EclipseIcon,
  Ellipsis,
  SendHorizonal,
  Plus
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import moment from "moment";
import { LinkedInContext } from "@/context/linkedInContext";
import CommentsOnPost from "./CommentsOnPost";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Posts = ({ posts }: { posts: any }) => {
  const { user, following } = useContext(LinkedInContext)
  // console.log("user and following", posts._id, following[0]._id)
  // console.log("all post", posts.createdBy._id, following[0]._id);
  // console.log("all comments ", posts.comments)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [userComments, setUserComments] = useState<any>([])
  const [commentText, setCommentText] = useState<any>("");
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    setUserComments(posts?.comments)
  }, [])
  // console.log(userComments)

  useEffect(() => {
    if(posts.createdBy._id.toString() !== following[0]?._id.toString()){
        setFollow(true)
    }
  },[])


  const commentPost = async () => {
    if (!commentText.trim()) return;
    const newComments = {
      comments: commentText,
      createdBy: {
        full_name: user.full_name,
        profile_image: user.profile_image
      }
    }
    setUserComments([newComments, ...userComments])
    setCommentText("")
    try {
      const response = await axios.post('/api/commentOnPost', { postId: posts._id, comments: commentText }, {withCredentials: true})
      if(response.data.success){
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log("error in post page", error)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message)
      }
    }
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post('/api/friends/sendRequests',{recevierId: posts.createdBy._id}, {withCredentials: true})
      if(response.data.success){
       
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.log("Error in post page in send request", error)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message)
      }
    }
  }

  return (
    <div className="relative bg-white rounded-xl flex flex-col gap-3 border border-gray-300">
      <div className="absolute flex items-center gap-5 right-5 top-4 cursor-pointer">
         {follow && 
          <div onClick={sendRequest} className="text-blue-700 font-semibold flex items-center gap-1 "><Plus className="w-4 h-4"/><p>Follow</p></div>
          }
        <Ellipsis className="h-4 w-4" />
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        <Link href={`/profile/${posts.createdBy._id}`}>
        <div className="flex gap-4 items-center cursor-pointer">
          {posts?.createdBy?.profile_image ? (
            <img
            src={posts.createdBy.profile_image}
            className="w-12  h-12 object-cover overflow-hidden rounded-full"
            alt=""
            />
          ) : (
            <div className="bg-white w-12 h-12"></div>
          )}

          <div>
            <p className="font-semibold text-gray- text=[14px] ">
              {posts?.createdBy?.full_name}
            </p>
            <p className="  text-[12px] text-gray-500">9,726,993 followers</p>
            <p className=" leading-3 text-[12px] text-gray-500">
              {moment(posts.createdAt).fromNow()}
            </p>
          </div>
        </div>
          </Link>
         

        <div>
          <p className="text-[14px]  text-gray-700 leading-4">
            {posts.content} <span>..more</span>
          </p>
        </div>
      </div>
      <div className="w-full">
        {posts.post_image ? (
          <img
            src={posts.post_image}
            className="w-full object-contain"
            alt=""
          />
        ) : null}
      </div>
      <div className="flex items-center justify-between px-4">
        <div></div>
        <div>
          <p className="text-[14px] font-semibold text-gray-600">
            {posts?.comments.length} comments 5 reports
          </p>
        </div>
      </div>
      <div className="flex items-center text-[14px] justify-between px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2  text-gray-800 cursor-pointer">
          <ThumbsUp className="w-5 h-5" />
          <p>Like</p>
        </div>
        <div onClick={() => setShowCommentBox(prev => !prev)} className="flex items-center gap-2 text-gray-800 cursor-pointer">
          <MessageCircleMore className="w-5 h-5" />
          <p>Comment</p>
        </div>
        <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
          <RepeatIcon className="w-5 h-5" />
          <p>Repost</p>
        </div>
        <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
          <Send className="w-5 h-5" />
          <p>Send</p>
        </div>
      </div>
      {showCommentBox &&
        <>
          <div className="flex items-center gap-3 w-full px-4 pb-4 ">
            <div className="w-9 h-8 bg-gray-800 rounded-full overflow-hidden">
              {user?.profile_image ? (
                <img src={user.profile_image} className="w-full h-full object-cover overflow-hidden" alt="" />
              ) : (

                <p className="md:text-[22px] text-base text-white">{user?.full_name.charAt(0)}</p>
              )}
            </div>
            <div className="flex items-center border-2 border-gray-300 rounded-full px-3 w-full max-w-lg bg-white dark:bg-gray-900">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm focus:outline-none h-10"
                onChange={(e: any) => setCommentText(e.target.value)}
              />
              <button type="button" className="p-1 hover:text-blue-600">
                <SmileIcon className="w-5 h-5" />
              </button>
              <button onClick={commentPost} type="button" className="p-1 hover:text-blue-600">
                <SendHorizonal className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* user Comments  */}
          <div className="flex items-center flex-col gap-5 w-full px-4  ">
            {userComments.map((comment: any, i: any) => (
              <CommentsOnPost key={i} comment={comment} index={i}/>
            ))}

          </div>
        </>
      }

    </div>
  );
};

export default Posts;
