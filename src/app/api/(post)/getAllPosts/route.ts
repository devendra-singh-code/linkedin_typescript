import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    await dbConnect()

    try {
        const id = await getDataFromToken(request)
        const user = await UserModel.findById(id)
        if(!user){
            return NextResponse.json({success: false, message: "User is not logged in"},{status: 401})
        }
        const getAllPost = await PostModel.find().sort({ createdAt: -1 }).populate("createdBy", "full_name profile_image").populate({path: "comments", populate: {path: "createdBy", select: "full_name profile_image"} , options: { sort: { createdAt: -1} } })

        const post = await PostModel.find({createdBy: id}).populate("createdBy", "full_name profile_image")

        return NextResponse.json({success: true, data: getAllPost,singleUserPost: post, message: "All Posts here"}, {status: 201})
    } catch (error) {
        console.log("Error in get all post route",error)
            return NextResponse.json({success: false, message: "Error in get all post route"},{status: 501})

    }
}