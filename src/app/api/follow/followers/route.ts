import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    await dbConnect()
    try {
        const id = await getDataFromToken(req)
        const user = await UserModel.findById(id).populate({path: "followers", populate: {path : "sender", select: "full_name profile_image"}})
        if(!user){
            return NextResponse.json({success: false, message: "User not loggedin"}, {status: 401})
        }

        const data = user.followers     
        console.log("followers ", data)

        return NextResponse.json({success: true,data, message: "Followers found"}, {status: 201})
    } catch (error) {
        console.error("Error in follow following page", error)
            return NextResponse.json({success: false, message: "Error in follow following page"}, {status: 501})

    }
}