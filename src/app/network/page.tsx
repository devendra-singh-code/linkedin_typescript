"use client";
import React, { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { LinkedInContext } from "@/context/linkedInContext";

const page = () => {
  const {followers, following} = useContext(LinkedInContext)
  const [showMore, setShowMore] = useState(false);
  const optionsOne = ["Groups", "Events", "Pages", "Newsletters"];
  const optionsTwo = [
    "About",
    "Accessibilty",
    "Help Center",
    "Privacy & Terms",
    "Ad Choice",
    "Advertising",
    "Business Service",
    "Get the linkedIn app",
    "More",
  ];
  
  return (
    <div className="flex flex-col gap-3">
      <div className=" bg-white dark:bg-[#2b2b2b] dark:text-white rounded-lg flex flex-col gap-3 p-3 border border-gray-300">
        <div className="">
          <p className=" text-gray-800 dark:text-white">Network overview</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 flex-col cursor-pointer">
            <p className="text-3xl text-gray-700 dark:text-white font-semibold">0</p>
            <p className="text-[12px] ">Invites sent</p>
          </div>
          <Link href={'/connections'} className="flex gap-1 flex-col cursor-pointer">
            <p className="text-3xl font-semibold text-gray-700 dark:text-white">10</p>
            <p className="text-[12px] ">Connections</p>
          </Link>
          <Link href={'/followers'} className="flex gap-1 flex-col cursor-pointer">
            <p className="text-3xl font-semibold text-gray-700 dark:text-white">{following?.length}</p>
            <p className="text-[12px] ">Following</p>
          </Link>
        </div>
        <div
          onClick={() => setShowMore(true)}
          className={`flex gap-2 cursor-pointer pt-2 items-center ${
            showMore === true && "hidden"
          }`}
        >
          <p className="text-gray-700 dark:text-white text-[14px]">show more </p>
          <ArrowDown className="h-4 w-4" />
        </div>
        {showMore && (
          <div className="flex flex-col gap-4 pt-4">
            {optionsOne.map((option) => (
              <div
                key={option}
                className="flex items-center gap-4 text-gray-600 dark:text-white text-[12px] font-semibold hover:underline cursor-pointer"
              >
                <p className="text-base">{option}</p>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => setShowMore(false)}
          className={`flex gap-2 cursor-pointer pt-2 items-center ${
            showMore === false && "hidden"
          }`}
        >
          <p className="text-gray-700 dark:text-white text-[14px]">show less </p>
          <ArrowUp className="h-4 w-4" />
        </div>
      </div>

      <div className="hidden  md:block">
      <div className="px-4 py-4 flex flex-wrap gap-2 items-center justify-center rounded-xl">
        {optionsTwo.map((option) => (
          <p
          key={option}
          className="text-[12px] font-semibold text-gray-700 dark:text-white cursor-pointer hover:underline hover:text-gray-900"
          >
            {option}
          </p>
        ))}
      </div>
        </div>

<div className="hidden md:block">

      <div className="px-4 rounded-xl flex items-center gap-2">
        <Image className="w-20" src={assets.logo1} alt="" />
        <p className="text-[12px] font-semibold text-gray-600 dark:text-white">
          LinkedIn Corporation @ 2024
        </p>
</div>
      </div>
    </div>
  );
};

export default page;
