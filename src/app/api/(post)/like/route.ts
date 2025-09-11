import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const id = await getDataFromToken(req)
        const { userPostId } = await req.json()
        const user = await UserModel.findById(id)
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 401 })
        }

        const postExisting = await PostModel.findById(userPostId)
        if (!postExisting) {
            return NextResponse.json({ success: false, message: "Post not found" }, { status: 401 })
        }

        const isLiked = postExisting.likes.includes(id)
        if (isLiked) {
            postExisting.likes.pull(id)
            await postExisting.save()
            return NextResponse.json({ success: true, message: "Unlike a post" }, { status: 201 })
        }

        postExisting.likes.push(id)
        await postExisting.save()
        return NextResponse.json({ success: true, message: "Like a post" }, { status: 201 })


    } catch (error) {
        console.error("Error in like route", error)
        return NextResponse.json({ success: false, message: "Error in Like a post" }, { status: 501 })
    }
}