import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    await dbConnect()
    try {
        const id = await getDataFromToken(request)  //sender id

        const {recevierId} = await request.json()   //receiver id

        const user = await UserModel.findById(id)
        if(!user){
            return NextResponse.json({success: false, message: "User not found"}, {status: 401})
        }

        const receiver = await UserModel.findById(recevierId).populate("followers.sender")
        if(!receiver){
            return NextResponse.json({success: false, message: "Receiver not found"}, {status: 401})
        }

        const existing = receiver.followers.find(follow => follow.sender.toString() === id)

        if(existing){
            return NextResponse.json({success: false, message: "Request Already sent"}, {status: 401})
        }

        receiver.followers.push({sender: id, status: "pending"})
        await receiver.save()
       

        return NextResponse.json({success: true, message: "Request Sent Successfully"}, {status: 201})

    } catch (error) {
        
    }
}