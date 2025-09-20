import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    console.log("get api")
    const { id } = await params;
    
    const posts = await PostModel.find({createdBy: id}).populate("createdBy", "full_name profile_image")

    
    return NextResponse.json(
      { success: true, data: posts, message: "all post of differnet user" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error in getallpost route in id", error);
    return NextResponse.json(
      { success: false, message: "Error in getallpost route in id" },
      { status: 501 }
    );
  }
}
