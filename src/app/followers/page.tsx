"use client";
import { LinkedInContext } from "@/context/linkedInContext";
import { Settings } from "lucide-react";
import React, { useContext, useState } from "react";

const page = () => {
  const [show, setShow] = useState("Following");
  const { followers, following } = useContext(LinkedInContext);
  // console.log("followers", followers)
  // console.log("following", following)

  return (
    <div className="flex gap-2 flex-col p-4 border border-gray-300 rounded-md">
      <div className="flex items-center justify-between">
        <p>Devendra's Network</p>
        <Settings className="w-5 h-5 text-gray-700 cursor-pointer" />
      </div>
      <div className="flex items-center mb-2">
        <p
          onClick={() => setShow("Following")}
          className={`w-[120px] text-center py-3 cursor-pointer border-b-2  ${
            show === "Following"
              ? "border-green-700 text-green-800"
              : "border-white"
          }`}
        >
          Following
        </p>
        <p
          onClick={() => setShow("Follower")}
          className={`w-[120px] text-center py-3 cursor-pointer border-b-2  ${
            show === "Follower"
              ? "border-green-700 text-green-800"
              : "border-white"
          }`}
        >
          Followers
        </p>
      </div>
      <div className={`${show === "Following" ? "block" : "hidden"}`}>
        {following?.map((followings: any) => (
          <div
            key={followings._id}
            className="flex items-center justify-between"
          >
            <div className="flex gap-2 items-center">
              {followings?.profile_image ? (
                <img
                  src={followings.profile_image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
              )}
              <div className="flex flex-col leading-tight cursor-pointer">
                <p className="text-[14px] text-gray-900 hover:underline">
                  {followings.full_name}
                </p>
                <p className="text-[12px] text-gray-700">
                  Building Teachyst - Platform for educators and creators |
                  YouTuber | Educator
                </p>
              </div>
            </div>
            <div>
              <button className=" rounded-full px-5 py-1 text-base font-semibold cursor-pointer border border-gray-800 text-gray-600">
                Following
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={`${show === "Follower" ? "block" : "hidden"}`}>
        {followers?.map((follower: any) => (
          <div key={follower._id} className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {follower?.sender.profile_image ? (
                <img
                  src={follower.sender.profile_image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
              )}
              <div className="flex flex-col leading-tight cursor-pointer">
                <p className="text-[14px] font-semibold text-gray-900 hover:underline">
                  {follower.sender.full_name}
                </p>
                <p className="text-[12px] text-gray-700">
                  Cloud Architect @ SELECCIÓN Consulting
                </p>
              </div>
            </div>
            <div>
              <button className=" rounded-full px-5 py-1 text-base font-semibold cursor-pointer border border-gray-800 text-gray-600">
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
