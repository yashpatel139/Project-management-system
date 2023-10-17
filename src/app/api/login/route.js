import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";



export async function POST(request) {
  console.log("Login API");
  const { email, password } = await request.json();
  try {
    await connectDB();
    const user = await User.findOne({
      email: email,
    });
    //Step 1. If user is null throw error
    if (user == null) {
      throw new Error("User not found!!!");
    }
    //Step 2. password check (Compare the password)
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password not matched!!!");
    }
    //Step 3. Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );
    console.log(user);
    console.log(token);
    //Step 4. Create next response and add the token to cookie
    const response =  NextResponse.json({
        message: "Login success",
        success: true,
        user: user,
      });

    response.cookies.set("authToken", token, {
        expiresIn: "1d",
        httpOnly: true,
    })

    return response;
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
