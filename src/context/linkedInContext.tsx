"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LinkedInContext = createContext<any>(undefined);

const LinkedInProvider =  ({ children }: { children: React.ReactNode }) => {
const [user, setUser] = useState(null)
const [showHeader, setShowHeader] = useState(true);
const [userLoggedIn, setUserLoggedIn] = useState(false)
const [followers, setFollowers] = useState<any>(null)
const [following, setFollowing] = useState<any>(null)



useEffect(() => {
  const fetchUser  = async () => {
    try {
      const response = await axios.get('/api/me', {withCredentials: true})
      if(response.data.success){
        setUser(response.data.data)
      }
    } catch (error: any) {
      console.log("Error in user fetching", error)
    }
  }
  fetchUser()
}, [userLoggedIn])

useEffect(() => {
  const fetchUser  = async () => {
    try {
      const response = await axios.get('/api/follow/followers', {withCredentials: true})
      if(response.data.success){
        setFollowers(response.data.data)
      }
    } catch (error: any) {
      console.log("Error in follower user", error)
    }
  }
  fetchUser()
}, [userLoggedIn])

useEffect(() => {
  const fetchUser  = async () => {
    try {
      const response = await axios.get('/api/follow/following', {withCredentials: true})
      if(response.data.success){
        setFollowing(response.data.data)
      }
    } catch (error: any) {
      console.log("Error in following use", error)
    }
  }
  fetchUser()
}, [userLoggedIn])


  const value = {user, showHeader, setShowHeader,setUserLoggedIn, followers, following};

  return (
    <LinkedInContext.Provider value={value}>
      {children}
    </LinkedInContext.Provider>
  );
};

export default LinkedInProvider;
