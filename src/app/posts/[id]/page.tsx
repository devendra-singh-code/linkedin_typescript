"use client"
import CommentsOnPost from '@/components/CommentsOnPost'
import Posts from '@/components/Posts'
import { LinkedInContext } from '@/context/linkedInContext'
import axios from 'axios'
import { Ellipsis, MessageCircleMore, RepeatIcon, Send, SendHorizonal, SmileIcon, ThumbsUp } from 'lucide-react'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState<any>([])
  
  useEffect(() => {
    const fetchUserPost = async () => {
      const res = await axios.get(`/api/getAllPosts/${id}`, { withCredentials: true })
      if (res.data.success) {
        setPosts(res.data.data)
      }
    }
    fetchUserPost()
  }, [])


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
          {posts.map((posts: any, i: any) => (
            <Posts posts={posts} key={posts._id} />
            // <div key={i} className="relative bg-white rounded-xl flex flex-col gap-3 border border-gray-300">
            //   <div className="absolute flex items-center gap-5 right-5 top-4 cursor-pointer">

            //     <Ellipsis className="h-4 w-4" />
            //   </div>

            //   <div className="px-4 pt-4 flex flex-col gap-3">

            //     <div className="flex gap-4 items-center cursor-pointer">
            //       {post?.createdBy?.profile_image ? (
            //         <img
            //           src={post.createdBy.profile_image}
            //           className="w-12  h-12 object-cover overflow-hidden rounded-full"
            //           alt=""
            //         />
            //       ) : (
            //         <div className="bg-white border-2 border-gray-600 rounded-full w-12 h-12 flex items-center justify-center font-semibold">{post?.createdBy?.full_name?.charAt(0)}</div>
            //       )}

            //       <div>
            //         <p className="font-semibold text-gray- text=[14px] ">
            //           {post?.createdBy?.full_name}
            //         </p>
            //         <p className="  text-[12px] text-gray-500">9,726,993 followers</p>
            //         <p className=" leading-3 text-[12px] text-gray-500">
            //           {moment(post?.createdAt).fromNow()}
            //         </p>
            //       </div>
            //     </div>


            //     <div>
            //       <p className="text-[14px]  text-gray-700 leading-4">
            //         {post.content} <span>..more</span>
            //       </p>
            //     </div>
            //   </div>
            //   <div className="w-full">
            //     {post?.post_image ? (
            //       <img
            //         src={post.post_image}
            //         className="w-full object-contain"
            //         alt=""
            //       />
            //     ) : null}
            //   </div>
            //   <div className="flex items-center justify-between px-4">
            //     <div></div>
            //     <div>
            //       <p className="text-[14px] font-semibold text-gray-600">
            //         {post?.comments?.length} comments 5 reports
            //       </p>
            //     </div>
            //   </div>
            //   <div className="flex items-center text-[14px] justify-between px-4 py-4 border-t border-gray-200">
            //     <div onClick={() => likedPost(post._id)} className={`flex items-center gap-2   cursor-pointer ${like ? 'text-blue-600' : 'text-gray-800'}`}>
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
  )
}

export default page
