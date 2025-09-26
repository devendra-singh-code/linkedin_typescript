"use client"
import axios from "axios";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

const SearchBar = ({ setSearchbar }: { setSearchbar: any }) => {
const [search, setSearch] = useState(null)
const [user, setUser] = useState<null | any>(null)

  const searchUser = async () => {
    console.log("search item", search)
    try {
      const response = await axios.post("/api/search", {userSearch: search}, {withCredentials: true})
      if(response.data.success){
        console.log("response", response.data.data)
        setUser(response.data.data)
      }
    } catch (error) {
      console.log("Error in searchbar page", error)
    }
  }
  return (
    <div className="absolute top-0 left-0 right-0 dark:bg-black/90 z-120 text-white">
      <div className="w-full h-screen flex items-baseline justify-center pt-28  ">
        <div className="flex gap-2 flex-col">

        <div className="flex items-center justify-center gap-5 flex-col">
          <div
            onClick={() => setSearchbar(false)}
            className="border-2 border-transparent p-2 rounded-full dark:hover:border-white cursor-pointer"
          >
            
            <X className="dark:text-white h-7 w-7" />
          </div>
          <div className="flex gap-2 items-center  border-2 dark:border-white rounded-lg  dark:text-white">

          <input
            type="text"
            className="w-[400px] flex-1 p-2 border-none outline-none"
            onChange={(e:any) => setSearch(e.target.value)}
            autoFocus
            />
            <Search onClick={searchUser} className="dark:text-white h-5 w-5 mx-3" />
            </div>
        </div>
        <div className="flex gap-2 mt-2 flex-col ">
          {user?.map((item: any) => (

          <p className="p-2  w-full cursor-pointer text-blue-600 font-semibold  rounded-sm">{item.full_name}</p>
          ))}
          {/* <p className="p-2  w-full cursor-pointer text-blue-600 font-semibold  rounded-sm">Devendra Singh</p> */}
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
