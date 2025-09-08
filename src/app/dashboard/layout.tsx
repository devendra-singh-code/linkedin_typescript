"use client";
import Header from "@/components/Header";
import Left from "./_left/page";
import Right from "./_right/page";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(false);
        const response = await axios.get("/api/me", { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.data);
          setLoading(true);
        }
      } catch (error) {
        console.log("Error in dashboard page", error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        }
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {loading && (
      <div className="w-full">
        <Header />
        <div className="w-full flex justify-between">
          <div className="md:w-[300px] hidden md:block w-full ">
            <Left user={user} />
          </div>
          <div className="w-full  max-w-[600px] md:px-10 ">{children}</div>
          <div className=" w-[300px] min-w-[300px] hidden md:block ">
            <Right />
          </div>
        </div>
      </div>
      )}
    </>
  );
}
