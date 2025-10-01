"use client";
import React, { useContext, useState } from "react";
import logo from "../../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LinkedInContext } from "@/context/linkedInContext";
import toast from "react-hot-toast";

const page = () => {
  const { setUserLoggedIn} = useContext(LinkedInContext)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { identifier: "", password: "" },
  });


  const login = async (data: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post("/api/login", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserLoggedIn(true)
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Error in fetching data in login");
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message)
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 px-16 w-full h-screen">
      <div className="w-36 h-16 mx-auto md:mx-0">
        <Image className="w-full" src={logo} alt="" />
      </div>
      <div className="flex flex-col items-center md:gap-2 gap-5 ">
        {/* <p className="md:text-2xl text-xl text-center text-gray-900 dark:text-white">
          Make the most of your professional life
        </p> */}
        <div className="text-left w-full">

        </div>
        <div>
          <div className="w-[340px] flex flex-col gap-4 bg-white dark:bg-[#2b2b2b] rounded-lg px-3 py-5">
        <p className="font-semibold text-[32px]">Sign In</p>
            <form onSubmit={handleSubmit(login)} className="flex flex-col gap-3">
              <div className="w-full flex flex-col gap-1">
                {/* <label className="text-sm text-gray-600 dark:text-white" htmlFor="email">
                  Email or phone number
                </label> */}
                <input
                  className="border-2 border-gray-400 p-3 dark:border-white dark:outline-none"
                  placeholder="Email or phone "
                  type="email"
                  id="email"
                  {...register("identifier", {
                    required: true,
                  })}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                {/* <label className="text-sm text-gray-600 dark:text-white" htmlFor="password">
                  Password (8+ character)
                </label> */}
                <input
                  className="border-2 border-gray-400 p-3 dark:border-white dark:outline-none"
                  placeholder="Password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              {/* <p className="text-[12px] py-2  text-gray-900 dark:text-white">
                By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                <span className="text-blue-900 cursor-pointer dark:text-blue-400">
                  {" "}
                  User Agreement, Privacy Policy,
                </span>{" "}
                and{" "}
                <span className="text-blue-900 cursor-pointer dark:text-blue-400">
                  Cookie Policy.
                </span>
              </p> */}
              <p className="text-blue-600 font-semibold cursor-pointer">Forget password?</p>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800 p-3 rounded-full text-white cursor-pointer focus:scale-95 transition"
              >
                Sign in
              </button>
            </form>
            <div className="relative flex flex-col items-center py-1 justify-center">
              <hr className="absolute top-[21x] w-full  bg-gray-600 rounded-full" />
              <p className="z-10 bg-white px-3 dark:bg-[#2b2b2b] dark:text-white">or</p>
            </div>
            <button className="w-full border border-black p-2 rounded-full text-[15px] cursor-pointer dark:border-white dark:text-white">
            
              Continue with Google
            </button>
            <button className="w-full border border-black p-2 rounded-full text-[15px]  cursor-pointer font-semibold dark:border-white dark:text-white">
              Continue with Microsoft
            </button>
            <p className="text-center text-[15px] dark:text-white">
              New to LinkedIn?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-blue-900 cursor-pointer dark:text-blue-400 font-semibold"
              >
                Join now
              </span>
            </p>
          </div>
          <p className="text-center text-[15px] py-3 dark:text-white">
            Looking to create a page for a business?{" "}
            <span className="text-blue-900 dark:text-blue-400">Get help</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
