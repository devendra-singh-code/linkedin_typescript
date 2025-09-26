// "use client";
import Header from "@/components/Header";
import Left from "./_left/page";
import Right from "./_right/page";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import jwt from 'jsonwebtoken'



export default async function Dashboard({ children }: { children: React.ReactNode }) {
  // const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(null);



  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      await dbConnect();
      user = await UserModel.findById(decoded.id).lean();
      // console.log("user", user)
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  // const userData =  getUserInfo()
  // const [user] = await Promise.all([userData])
  // console.log("user", user)

  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // let user;
  // const UserFetch = await  axios.get(`${baseUrl}/api/me`, { withCredentials: true })  // Request failed with status code 501
  // console.log("userfetch", UserFetch)
  //  if (UserFetch.data.success) {
  //         user = UserFetch.data.data
  //         // setLoading(true);
  //       }

  // try {
  //   const UserFetch = await axios.get(`${baseUrl}/app/api/me/route.ts`, { withCredentials: true })  // Request failed with status code 501
  //   console.log("userfetch", UserFetch)
  // } catch (error) {
  //   console.log("Error in dashboard page", error);
  //   if (axios.isAxiosError(error)) {
  //     // toast.error(error.response?.data?.message);
  //     console.log(error.response?.data?.message)
  //   }
  // }

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       setLoading(false);
  //       const response = await axios.get("/api/me", { withCredentials: true });
  //       if (response.data.success) {
  //         setUser(response.data.data);
  //         setLoading(true);
  //       }
  //     } catch (error) {
  //       console.log("Error in dashboard page", error);
  //       if (axios.isAxiosError(error)) {
  //         toast.error(error.response?.data?.message);
  //       }
  //       setLoading(false);
  //     }
  //   };
  //   getUser();
  // }, []);

  return (
    <>

      <div className="w-full dark:bg-[#202020]">
        <Header />
        <div className="w-full flex justify-between">
          <div className="md:w-[300px] hidden md:block w-full dark:bg-[#202020] ">
            <Left user={user} />
          </div>
          <div className="w-full  max-w-[600px] md:px-10 ">{children}</div>
          <div className=" w-[300px] min-w-[300px] hidden md:block  ">
            <Right />
          </div>
        </div>
      </div> 

    </>
  );
}
