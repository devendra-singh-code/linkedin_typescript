"use client"
import { LinkedInContext } from '@/context/linkedInContext'
import axios from 'axios'
import { MessageCircleMore, RepeatIcon, Send, SendHorizonal, SmileIcon, ThumbsUp, X } from 'lucide-react'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CommentsOnPost from './CommentsOnPost'

const FullScreenPosts = ({ setShowFullScreenPost, posts }: any) => {
  const { user, following } = useContext(LinkedInContext)
  const [userComments, setUserComments] = useState<any>([])

  const [showCommentBox, setShowCommentBox] = useState(false)

  const [commentText, setCommentText] = useState<any>("");


  useEffect(() => {
    setUserComments(posts?.comments)
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
    setCommentText("")
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

  return (
    <div className=" fixed z-110 top-0 left-0 bottom-0  w-full h-screen bg-black/80  flex items-center justify-center overflow-hidden">
      <div className="relative bg-white h-[80vh]  rounded-2xl md:w-[80%] w-full flex justify-between gap-5 overflow-hidden">
        <div
          onClick={() => setShowFullScreenPost(false)}
          className="absolute right-6 top-4 cursor-pointer"
        >
          <X className="font-semibold text-2xl" />
        </div>
        <div className='w-[65%]  flex justify-center items-center bg-black p-5'>
          <div className="w-full ">
            {posts?.post_image ? (
              <img
                src={posts.post_image}
                className="w-full object-contain"
                alt=""
              />
            ) : null}
            {posts?.post_video ? (
              <video src={posts.post_video} controls className="max-h-[400px] w-full text-center" />
            ) : null}
          </div>
        </div>

        <div className='w-[35%] flex flex-col justify-between'>
          <div className="px-4 pt-4 flex flex-col gap-3">
            <div >
              <div className="flex gap-4 items-center cursor-pointer">
                {posts?.createdBy?.profile_image ? (
                  <img
                    src={posts.createdBy.profile_image}
                    className="w-12  h-12 object-cover overflow-hidden rounded-full"
                    alt=""
                  />
                ) : (
                  <div className="bg-white border-2 border-gray-600 rounded-full w-12 h-12 flex items-center justify-center font-semibold">{posts?.createdBy?.full_name?.charAt(0)}</div>
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
            </div>
          </div>

          <div className="flex flex-col items-center  gap-5 w-full p-2 h-[300px] overflow-y-scroll my-scroll-container">
            {userComments.map((comment: any, i: any) => (
              <CommentsOnPost key={i} comment={comment} index={i} />
            ))}

          </div>

          <div className='flex flex-col gap-2 w-full'>
            <div className="flex items-center text-[14px] justify-between px-4 py-4 border-t border-gray-200">
              <div className={`flex items-center gap-2   cursor-pointertext-gray-800`}>
                <ThumbsUp className={`  rounded-full  'w-4 h-4`} />

                <p className="font-semibold text-sm">Like</p>
              </div>
              <div onClick={() => setShowCommentBox(prev => !prev)} className="flex items-center gap-2 text-gray-800 cursor-pointer">
                <MessageCircleMore className="w-4 h-4" />
                <p className="font-semibold text-sm">Comment</p>
              </div>
              <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
                <RepeatIcon className="w-4 h-4" />
                <p className="font-semibold text-sm">Repost</p>
              </div>
              <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
                <Send className="w-4 h-4" />
                <p className="font-semibold text-sm">Send</p>
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
                    <button
                      onClick={commentPost}
                      type="button" className="p-1 hover:text-blue-600">
                      <SendHorizonal className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </>
            }


          </div>
        </div>


      </div>
    </div>
  )
}

export default FullScreenPosts
