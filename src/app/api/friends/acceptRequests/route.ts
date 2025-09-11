import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const id = await getDataFromToken(req)   // anju
        const { senderId } = await req.json()     // devendra
        console.log("senderid", senderId)
        const receiver = await UserModel.findById(id)
        // console.log("anju ", receiver)
        if (!receiver) {
            return NextResponse.json({ success: false, message: "Receiver not found" }, { status: 401 })
        }

        const request = receiver.followers.find(f => f.sender.toString() === senderId)
   
        if (!request) {
            return NextResponse.json({ success: false, message: "Request not found" }, { status: 401 })
        }

        request.status = "accept"
        await receiver.save()

        const sender = await UserModel.findById(senderId)
        if (sender && !sender.following.some(f => f.toString() === id.toString())) {
            sender.following.push(id);
            await sender.save();
        }

        return NextResponse.json({ success: true, message: "Friend request accepted" }, { status: 200 });
    } catch (error) {
        console.error("error in acceptRequest route ", error)
        return NextResponse.json({ success: false, message: "Error in Accepting a request" }, { status: 501 });
    }
}