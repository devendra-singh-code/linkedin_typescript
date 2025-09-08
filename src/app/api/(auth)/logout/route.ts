import { getDataFromToken } from "@/helper/getDataFromToken";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User not found or logout" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Does not exist" },
        { status: 401 }
      );
    }

    const stored = await cookies();

    stored.delete("token");
  

    return NextResponse.json(
      { success: true, message: "Logout Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Logout Route", error);
    return NextResponse.json(
      { success: false, message: "Error in Logout Route" },
      { status: 501 }
    );
  }
}
