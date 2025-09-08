import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()

    try {
        const { postId, comments } = await request.json()
      
        const id = await getDataFromToken(request)
        const user = await UserModel.findById(id)
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not found" }, { status: 401 })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return NextResponse.json({ success: false, message: "Post not found" }, { status: 401 })
        }

        post.comments.push({ createdBy: id, comments })
        post.save()

        return NextResponse.json({ success: true, message: "comment successfull" }, { status: 201 })

    } catch (error) {
        console.error("Error in commentsonPost route ", error)
        return NextResponse.json({ success: false, message: "Error in commentsonPost route" }, { status: 501 })

    }
}