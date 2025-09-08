import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const id = await getDataFromToken(request);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User not Logged in" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid User..." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, data: user, message: "User Found" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Me route ", error);
    return NextResponse.json(
      { success: false, message: "Error in Me route" },
      { status: 501 }
    );
  }
}
