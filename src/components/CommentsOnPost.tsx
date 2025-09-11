import { Ellipsis } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const CommentsOnPost = ({ comment, index }: { comment: any, index: any }) => {
  // console.log("comments", comment)
  return (
    <div className={`flex gap-3 w-full  border-b border-gray-200 pb-4`}>
      {/* Avatar */}
      <div className="bg-gray-800 rounded-full w-9 h-9 overflow-hidden" >
        {comment?.createdBy?.profile_image ? (
          <img
            src={comment.createdBy.profile_image}
            className="w-full  h-full object-cover overflow-hidden rounded-full"
            alt=""
          />
        ) : (
          <div className="bg-white "></div>
        )}

      </div>
      {/* Post Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <p className="font-semibold text-gray-900 text-[14px]">
              {comment?.createdBy?.full_name}
            </p>
            <p className="text-[11px] text-gray-500">9,726,993 followers</p>
          </div>


          <div className="flex items-center gap-3">
            <p className="text-gray-600 text-[12px]">{moment(comment.createdAt).fromNow()}</p>
            <Ellipsis className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>
        </div>


        {/* Post Content */}
        <p className="mt-2 text-sm leading-tight text-gray-800">
          {comment.comments}
        </p>
        <div className='flex gap-2 text-sm text-gray-500 mt-1'>
          <p className='cursor-pointer hover:text-gray-800'>like</p>
          <p>|</p>
          <p className='cursor-pointer hover:text-gray-800'>reply</p>
        </div>
      </div>
    </div>
  )
}

export default CommentsOnPost
