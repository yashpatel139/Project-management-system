import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/helper/db";



export async function GET(request){
    const authToken = request.cookies.get("authToken")?.value;
    console.log(authToken);
    if(!authToken) {
        return NextResponse.json({
            message: "User is not logged in.",
        })
    }

    const data = jwt.verify(authToken, process.env.JWT_KEY);
    console.log(data);
    await connectDB();
    const user = await User.findById(data._id).select("-password");


    return NextResponse.json({user});
}