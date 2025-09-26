import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const {userSearch} = await request.json()
        const user = await UserModel.find({full_name: {$regex: userSearch,  $options: "i"}})
        if(!user){
            return NextResponse.json({success: false, mesaage: "User Not Found"}, {status: 401})
        }
        return NextResponse.json({success: true, data: user, message: "user found"}, {status: 201})
    } catch (error) {
        console.log("Error in search route page", error)
        return NextResponse.json({success: false, message: "Error in search route page"}, {status: 501})
    }
}