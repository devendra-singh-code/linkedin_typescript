import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    await dbConnect()
    try {
        const {pendingId} = await req.json() 
        const user = await UserModel.findById(pendingId)
        if(!user){
            return NextResponse.json({success: false, messgae: "User not found"}, {status: 401})
        }

        return NextResponse.json({success: true,data: user, message :"details"}, {status: 201})
    } catch (error) {
            return NextResponse.json({success: false, messgae: "User not found"}, {status: 501})
        
    }
}