import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, data: user, message: "User details profile" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error in me route in id", error);
    return NextResponse.json(
      { success: false, message: "Error in me route in id" },
      { status: 501 }
    );
  }
}
