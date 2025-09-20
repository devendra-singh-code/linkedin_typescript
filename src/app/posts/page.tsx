"use client";
import { ArrowBigDownDash, Calendar1, Clock, Ellipsis, ImageDown, ImageDownIcon, Link, Loader2, MessageCircleMore, NotebookPen, Plus, RepeatIcon, Send, SendHorizonal, SmileIcon, ThumbsUp, Video, X, Youtube } from "lucide-react";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import axios from "axios";
import { LinkedInContext } from "@/context/linkedInContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";
import CommentsOnPost from "@/components/CommentsOnPost";

const page = () => {
  const { user, singleUserPost, allPost: posts } = useContext(LinkedInContext);


  const { following } = useContext(LinkedInContext)
  const [like, setLike] = useState<any>(false)
  // console.log("user and following", posts._id, following[0]._id)
  // console.log("all post", posts.createdBy._id, following[0]._id);
  // console.log("all comments ", posts.comments)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [userComments, setUserComments] = useState<any>([])
  const [commentText, setCommentText] = useState<any>("");
  const [follow, setFollow] = useState(false)
  const [followed, setFollowed] = useState(false)
// console.log("single user post", singleUserPost)
// console.log("posts", user)
  useEffect(() => {
    setUserComments(posts?.comments)
  }, [])
  // console.log(userComments)

  // useEffect(() => {
  //   if ((posts?.createdBy._id?.toString() !== following[0]?._id?.toString())) {
  //     setFollow(true)
  //     setFollowed(true)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (posts?.createdBy._id?.toString() === user._id.toString()) {
  //     setFollow(false)
  //   }
  // }, [])

  useEffect(() => {
    if (posts?.likes?.includes(user._id)) {
      setLike(true)
    }
  }, [])

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
    setUserComments("")
    try {
      const response = await axios.post('/api/commentOnPost', { postId: posts._id, comments: commentText }, { withCredentials: true })
      if (response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log("error in post page", error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      }
    }
  }


  const likedPost = async (id: any) => {
    setLike((prev: any) => !prev)
    try {
      const response = await axios.post("/api/like", { userPostId: id }, { withCredentials: true })
      if (response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error("Error in poost page in like post", error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      }
    }
  }


  return (
    <>
      {/* {addPost && <AddPost setAddPost={setAddPost} />} */}
      <div className="flex flex-col gap-3">

        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold text-gray-700">All Activity</p>
          <div className="flex gap-2">
            <p className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-400">Posts</p>
            <p className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-400">Comments</p>
            <p className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-400">Images</p>
            <p className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-400">Video</p>
            <p className="px-3 py-1 rounded-full text-sm font-semibold border border-gray-400">Events</p>
          </div>
        </div>


        {/* User posts  */}

        <div className="flex flex-col gap-2 ">
          {singleUserPost.map((posts: any, i: any) => (
              <Posts posts={posts} key={posts._id} />
            // <div key={i} className="relative bg-white rounded-xl flex flex-col gap-3 border border-gray-300">
            //   <div className="absolute flex items-center gap-5 right-5 top-4 cursor-pointer">
              
            //     <Ellipsis className="h-4 w-4" />
            //   </div>

            //   <div className="px-4 pt-4 flex flex-col gap-3">
                
            //       <div className="flex gap-4 items-center cursor-pointer">
            //         {user?.profile_image ? (
            //           <img
            //             src={user.profile_image}
            //             className="w-12  h-12 object-cover overflow-hidden rounded-full"
            //             alt=""
            //           />
            //         ) : (
            //           <div className="bg-white border-2 border-gray-600 rounded-full w-12 h-12 flex items-center justify-center font-semibold">{user?.full_name?.charAt(0)}</div>
            //         )}

            //         <div>
            //           <p className="font-semibold text-gray- text=[14px] ">
            //             {user?.full_name}
            //           </p>
            //           <p className="  text-[12px] text-gray-500">9,726,993 followers</p>
            //           <p className=" leading-3 text-[12px] text-gray-500">
            //             {moment(singlePost?.createdAt).fromNow()}
            //           </p>
            //         </div>
            //       </div>


            //     <div>
            //       <p className="text-[14px]  text-gray-700 leading-4">
            //         {singlePost.content} <span>..more</span>
            //       </p>
            //     </div>
            //   </div>
            //   <div className="w-full">
            //     {singlePost?.post_image ? (
            //       <img
            //         src={singlePost.post_image}
            //         className="w-full object-contain"
            //         alt=""
            //       />
            //     ) : null}
            //   </div>
            //   <div className="flex items-center justify-between px-4">
            //     <div></div>
            //     <div>
            //       <p className="text-[14px] font-semibold text-gray-600">
            //         {singlePost?.comments?.length} comments 5 reports
            //       </p>
            //     </div>
            //   </div>
            //   <div className="flex items-center text-[14px] justify-between px-4 py-4 border-t border-gray-200">
            //     <div onClick={() => likedPost(posts._id)} className={`flex items-center gap-2   cursor-pointer ${like ? 'text-blue-600' : 'text-gray-800'}`}>
            //       <ThumbsUp className={`  rounded-full  ${like ? 'bg-blue-600  p-1 w-5 h-5 text-white' : 'w-4 h-4'}`} />

            //       <p className="font-semibold text-sm">Like</p>
            //     </div>
            //     <div onClick={() => setShowCommentBox(prev => !prev)} className="flex items-center gap-2 text-gray-800 cursor-pointer">
            //       <MessageCircleMore className="w-4 h-4" />
            //       <p className="font-semibold text-sm">Comment</p>
            //     </div>
            //     <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
            //       <RepeatIcon className="w-4 h-4" />
            //       <p className="font-semibold text-sm">Repost</p>
            //     </div>
            //     <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
            //       <Send className="w-4 h-4" />
            //       <p className="font-semibold text-sm">Send</p>
            //     </div>
            //   </div>
            //   {showCommentBox &&
            //     <>
            //       <div className="flex items-center gap-3 w-full px-4 pb-4 ">
            //         <div className="w-9 h-8 bg-gray-800 rounded-full overflow-hidden">
            //           {user?.profile_image ? (
            //             <img src={user.profile_image} className="w-full h-full object-cover overflow-hidden" alt="" />
            //           ) : (

            //             <p className="md:text-[22px] text-base text-white">{user?.full_name.charAt(0)}</p>
            //           )}
            //         </div>
            //         <div className="flex items-center border-2 border-gray-300 rounded-full px-3 w-full max-w-lg bg-white dark:bg-gray-900">
            //           <input
            //             type="text"
            //             placeholder="Add a comment..."
            //             className="flex-1 bg-transparent text-sm focus:outline-none h-10"
            //             onChange={(e: any) => setCommentText(e.target.value)}
            //           />
            //           <button type="button" className="p-1 hover:text-blue-600">
            //             <SmileIcon className="w-5 h-5" />
            //           </button>
            //           <button onClick={commentPost} type="button" className="p-1 hover:text-blue-600">
            //             <SendHorizonal className="w-5 h-5" />
            //           </button>
            //         </div>

            //       </div>

            //       {/* user Comments  */}
            //       <div className="flex flex-col-reverse items-center  gap-5 w-full px-4  ">
            //         {userComments?.map((comment: any, i: any) => (
            //           <CommentsOnPost key={i} comment={comment} index={i} />
            //         ))}

            //       </div>
            //     </>
            //   }

            // </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default page;
