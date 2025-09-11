"use client";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import axios from "axios";
import {
  Bell,
  Home,
  Menu,
  MenuSquare,
  MessageCircleDashed,
  Network,
  SearchCode,
  UserCircle2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LinkedInContext } from "@/context/linkedInContext";

const Header = () => {
  const { user } = useContext(LinkedInContext)
  const route = useRouter();
  const pathname = usePathname();
  // const [showHeader, setShowHeader] = useState(false);
  const [option, setOption] = useState(false);
  const [sidebarMenu, setSidebarMenu] = useState(false);

  const navbarMenu = [
    { image: Home, title: "Home", path: "dashboard" },
    { image: Network, title: "Network", path: "network" },
    { image: MessageCircleDashed, title: "Messages", path: "messages" },
    { image: Bell, title: "Notifications", path: "notifications" },
    // { image: UserCircle2, title: "Profile", path: "profile" },
  ];
  const navbarMenuMobile = [
    { image: Home, title: "Home", path: "dashboard" },
    { image: Network, title: "Network", path: "network" },
    { image: MessageCircleDashed, title: "Messages", path: "messages" },
    { image: Bell, title: "Notifications", path: "notifications" },
    { image: UserCircle2, title: "Profile", path: "profile" },
  ];

  const pathenameValue = pathname.split("/")[1];


  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout", {
        withCredentials: true,
      });

      if (response.data.success) {
        route.push("/login");
      }
    } catch (error: any) {
      console.log("Error in Logout..", error);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-100 bg-white  pb-5 pt-2">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 mr-2">
          <Link href={"/dashboard"}>
            <Image src={assets.minilogo} alt="" className="w-[35px]" />
          </Link>
          <div className="flex w-[300px] items-center border border-gray-400 gap-3 px-3 py-1.5 rounded-full ">
            <SearchCode className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here"
              className="border-none w-full outline-none placeholder:text-gray-400 text-[14px] font-semibold flex-1"
            />
          </div>
        </div>

        <div className="flex">
          <div className="md:block hidden">
            <div className="flex items-center gap-1">
              {navbarMenu.map((menu) => (
                <Link
                  href={`/${menu.path}`}
                  key={menu.title}
                  className={`flex items-center flex-col py-1 px-5 border-b-2 ${menu.path === pathenameValue
                      ? "border-gray-500 text-black font-semibold"
                      : "border-white text-slate-600"
                    } border-gray-500  cursor-pointer`}
                >
                  <menu.image
                    className={`w-5 h-5  ${menu.path === pathenameValue &&
                      "-rotate-12 transition-all duration-500"
                      } `}
                  />
                  <p className="font-semibold text-[14px] ">{menu.title}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:block hidden">

            <div
              onClick={() => setOption((prev) => !prev)}
              className={`relative group flex items-center flex-col py-1 px-5 border-b-2  ${pathenameValue === "profile"
                  ? "border-gray-500 text-black font-semibold"
                  : "border-white text-slate-600"
                } border-gray-500  cursor-pointer`}
            >
              {user?.profile_image ? (
                <img src={user.profile_image} className="w-6 h-6 object-cover rounded-full overflow-hidden" alt="" />
              ) : (
                <div className="h-6 w-6 text-sm rounded-full border border-gray-400 overflow-hidden flex items-center justify-center font-semibold">{user?.full_name.charAt(0)}</div>
              )}
              {/* <UserCircle2 className="w-5 h-5" /> */}
              <p className="font-semibold text-[14px] ">Me</p>


              <div className=" absolute right-10 top-16 hidden group-hover:block w-[250px] bg-white rounded-xl overflow-hidden border border-gray-300 transition-all  duration-500 ">
                <div className=" relative h-16 ">
                  {user?.cover_image ? (
                    <img src={user.cover_image} className='w-full h-full object-cover overflow-hidden' alt="" />
                  ) : (
                    <div className='bg-gray-400 h-full w-full'></div>
                  )}
                  <div className=" absolute top-8  left-6 h-16  flex items-center justify-center w-16 bg-green-600 rounded-full border-2 border-white">
                    {user?.profile_image ? (
                      <img src={user.profile_image} className='w-16 h-16 object-cover rounded-full' alt="" />
                    ) : (
                      <p className="text-[30px] text-white">{user?.full_name.charAt(0)}</p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col mt-10">
                  <p className="text-xl font-semibold text-gray-8">{user?.full_name}</p>
                  <p className="text-[12px] text-gray-900">Web Developer</p>
                  <p className="text-[12px] text-gray-500">Bhopal, Madhya Pradesh</p>

                </div>
              </div>


            </div>

          </div>

          {option && (
            <div className="absolute top-16 right-2 z-20 bg-white p-3 border border-gray-400 rounded w-[300px] flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 bg-green-600 rounded-full text-white">
                  <p>D</p>
                </div>
                <div>
                  <p className="font-semibold">Devendra Singh</p>
                  <p className="text-sm text-gray-600">Web Developer</p>
                </div>
              </div>
              <div
                onClick={() => {
                  setOption(false);
                  route.push("/profile");
                }}
                className="border-2 border-blue-400 hover:border-blue-800 rounded-3xl w-full cursor-pointer"
              >
                <p className="w-full text-center text-blue-600 hover:text-blue-900 py-1 font-semibold text-[15px]">
                  View profile
                </p>
              </div>
              <div className=" border-t-2 border-b-2 py-2 flex flex-col gap-1">
                <p className="font-semibold">Account</p>
                <p className="text-sm hover:underline">
                  Try 1 month of Premium fo $0
                </p>
                <p className="text-sm text-gray-600 hover:underline">
                  Settings & Privacy
                </p>
                <p className="text-sm text-gray-600 hover:underline">Help</p>
                <p className="text-sm text-gray-600 hover:underline">
                  {" "}
                  Language
                </p>
              </div>
              <div className=" border-t-2 border-b-2 py-2 flex flex-col gap-1">
                <p className="font-semibold">Manage</p>
                <p className="text-sm text-gray-600 hover:underline">
                  Posts & Activity
                </p>
                <p className="text-sm text-gray-600 hover:underline">
                  Job Posting Account
                </p>
              </div>
              <div>
                <p
                  onClick={handleLogout}
                  className="text-sm text-gray-600 cursor-pointer hover:underline"
                >
                  Sign Out
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden block">
          {sidebarMenu && (
            <div className="absolute left-0 top-0 h-screen bg-black/90 border-r border-r-gray-500 w-full  transition-all duration-300">
              <div className="flex items-center justify-center h-full  flex-col gap-0.5 p-2">
                <div>

                  {navbarMenuMobile.map((menu) => (
                    <Link
                      href={`/${menu.path}`}
                      key={menu.title}
                      className={`px-4 py-2 flex  w-full items-center justify-center gap-2 rounded-xl  ${menu.path === pathenameValue
                          ? "border-gray-400  bg-gray-800 text-white font-semibold"
                          : "border-white text-slate-200"
                        } border-white  cursor-pointer`}
                    >
                      {/* <menu.image className="w-4 h-4  " /> */}
                      <p className="font-semibold text-[20px] ">{menu.title}</p>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => setSidebarMenu((prev) => !prev)}
          className="md:hidden block"
        >
          <Menu className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Header;
