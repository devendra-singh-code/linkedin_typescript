"use client";

import { signUpSchema } from "@/schemas/signUpSchema";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import logo from "../../../../assets/logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", full_name: "", username: "" },
  });

  const signup = async (data: z.infer<typeof signUpSchema>) => {
    console.log("data", data)
    try {
      const response = await axios.post('/api/signup', data, {withCredentials: true})
      console.log("response ", response)
      if(response.data.success){
        router.push('/login')
      }
    } catch (error: any) {
      console.log("error in register page ", error)
      if(axios.isAxiosError(error)){
        console.log("backend error ", error.response?.data?.message)
        toast.error(error.response?.data?.message)
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0   px-16 w-full">
      {/* Logo */}
      <div className="w-36 h-16">
        <Image className="w-full" src={logo} alt="Company Logo" />
      </div>

      {/* Sign-in Container */}
      <div className="flex flex-col items-center gap-10">
        <div className="w-[340px] flex flex-col gap-3 bg-white dark:bg-[#2b2b2b] rounded-lg px-3 py-5">
          {/* Header */}
          <div className="dark:text-white">
            <p className="text-[32px] font-medium">Sign in</p>
            <p className="text-sm">Stay updated on your professional world.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(signup)} className="flex flex-col gap-3">
            {/* Username */}
            <div className="w-full flex flex-col gap-1">
              {/* <label className="text-sm font-medium dark:text-white">Username</label> */}
              <input
                className="border-2 border-gray-500 p-1 placeholder:text-[14px] outline-none rounded dark:placeholder:text-white"
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-1">
              {/* <label className="text-sm font-medium dark:text-white">Email or phone</label> */}
              <input
                className="border-2 border-gray-500 p-1 placeholder:text-[14px] outline-none rounded dark:placeholder:text-white"
                type="email"
                placeholder="Email or phone"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-1">
              {/* <label className="text-sm font-medium dark:text-white">Password</label> */}
              <input
                className="border-2 border-gray-500 p-1 placeholder:text-[14px] outline-none rounded dark:placeholder:text-white"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div className="w-full flex flex-col gap-1">
              {/* <label className="text-sm font-medium dark:text-white">Full Name</label> */}
              <input
                className="border-2 border-gray-500 p-1 placeholder:text-[14px] outline-none rounded dark:placeholder:text-white"
                type="text"
                placeholder="Full Name"
                {...register("full_name")}
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Forget Password */}
            <p className="text-[14px] cursor-pointer hover:text-blue-900 text-blue-700 font-semibold dark:text-blue-400">
              Forget password?
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded-full text-white cursor-pointer focus:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex flex-col items-center py-1 justify-center">
            <hr className="absolute top-[20px] w-full bg-gray-600 rounded-full dark:bg-white" />
            <p className="z-10 bg-white px-3 dark:bg-[#2b2b2b] dark:text-white">or</p>
          </div>

          {/* Terms */}
          <p className="text-sm dark:text-white">
            By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
            <span className="text-blue-900 dark:text-blue-400">User Agreement, Privacy Policy,</span>{" "}
            and <span className="text-blue-900 dark:text-blue-400">Cookie Policy.</span>
          </p>

          {/* Social Buttons */}
          <button
            type="button"
            className="w-full border border-black p-2 text-[15px] rounded-full cursor-pointer dark:border-white dark:text-white"
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full border border-black p-2 text-[15px] rounded-full cursor-pointer font-semibold dark:border-white dark:text-white"
          >
            Continue with Microsoft
          </button>
          <button
            type="button"
            className="w-full border border-black p-2 text-[15px] rounded-full text-gray-700 cursor-pointer font-semibold dark:border-white dark:text-white"
          >
            Continue with Apple
          </button>
        </div>

<div className="flex flex-col gap-8">
              <p className="text-center text-[15px]">
                Already on LinkedIn?{" "}
                <span onClick={() => router.push('/login')} className="text-blue-900 font-semibold cursor-pointer text-[16px]">
                  Sign in
                </span>
              </p>
            </div>
        {/* Footer */}
       
      </div>
    </div>
  );
};

export default Page;
