import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { identifier, password } = await request.json();
    const user = await UserModel.findOne({ email: identifier });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email doesnot exist" },
        { status: 401 }
      );
    }

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { success: false, message: "Inavlid Credentails" },
          { status: 401 }
        );
      }

      user.lastLogin = new Date();
      user.save();

      const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error(
          "JWT_SECRET_KEY is not defined in environment variables."
        );
      }
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!);
      const response = NextResponse.json(
        { success: true, data: user, message: "Logging Successfully" },
        { status: 201 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      
      return response;
    }
  } catch (error) {
    console.error("Error in Login Route", error);
    return NextResponse.json(
      { success: false, message: "Error in Login Route" },
      { status: 501 }
    );
  }
}
