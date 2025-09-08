import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, password, email, full_name } = await request.json();
console.log("username email", email)
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "Email Already exists" },
        { status: 401 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashPassword,
      email,
      full_name,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User Register Successfull" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in registering a User", error);
    return NextResponse.json(
      { success: false, message: "Error in Signup Route" },
      { status: 501 }
    );
  }
}
