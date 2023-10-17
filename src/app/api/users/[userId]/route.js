import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    await connectDB();
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while fetching user.",
      success: false,
    });
  }
}

//delete user
export async function DELETE(request, { params }) {
  const { userId } = params;
  // console.log(userId)
  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      message: "User Deleted!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while deleting user.",
      success: false,
    });
  }
}

//Update User
export async function PUT(request, { params }) {
  const { userId } = params;

  const { name, password, about, profileUrl } = await request.json();

  try {
    await connectDB();
    const user = await User.findById(userId);

    user.name = name;
    user.password = password;
    user.about = about;
    user.profileUrl = profileUrl;

    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to update the user.",
      success: false,
    });
  }
}
