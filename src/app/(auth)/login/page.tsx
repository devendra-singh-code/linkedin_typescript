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
  const {setShowHeader, setUserLoggedIn} = useContext(LinkedInContext)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { identifier: "", password: "" },
  });


  const login = async (data: z.infer<typeof signInSchema>) => {
    // console.log("data", data);
    try {
      const response = await axios.post("/api/login", data, {
        withCredentials: true,
      });
      // console.log(response)
      if (response.data.success) {
        // setShowHeader(true)
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
      <div className="flex flex-col items-center md:gap-10 gap-5 ">
        <p className="md:text-2xl text-xl text-center text-gray-900">
          Make the most of your professional life
        </p>
        <div>
          <div className="w-[340px] flex flex-col gap-4 bg-white rounded-lg px-3 py-5">
            <form onSubmit={handleSubmit(login)}>
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-gray-600" htmlFor="email">
                  Email or phone number
                </label>
                <input
                  className="border-2 border-gray-500 p-1"
                  type="email"
                  id="email"
                  {...register("identifier", {
                    required: true,
                  })}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-gray-600" htmlFor="password">
                  Password (8+ character)
                </label>
                <input
                  className="border-2 border-gray-500 p-1"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <p className="text-[12px] py-2  text-gray-900">
                By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                <span className="text-blue-900 cursor-pointer">
                  {" "}
                  User Agreement, Privacy Policy,
                </span>{" "}
                and{" "}
                <span className="text-blue-900 cursor-pointer">
                  Cookie Policy.
                </span>
              </p>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded-full text-white cursor-pointer focus:scale-95 transition"
              >
                Agree & Join
              </button>
            </form>
            <div className="relative flex flex-col items-center py-1 justify-center">
              <hr className="absolute top-[21x] w-full  bg-gray-600 rounded-full" />
              <p className="z-10 bg-white px-3">or</p>
            </div>
            <button className="w-full border border-black p-1.5 rounded-full text-[15px] cursor-pointer">
              Continue with Google
            </button>
            <button className="w-full border border-black p-1.5 rounded-full text-[15px]  cursor-pointer font-semibold">
              Continue with Microsoft
            </button>
            <p className="text-center text-[15px] ">
              New to LinkedIn?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-blue-900 cursor-pointer"
              >
                Join now
              </span>
            </p>
          </div>
          <p className="text-center text-[15px] py-3">
            Looking to create a page for a business?{" "}
            <span className="text-blue-900">Get help</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
