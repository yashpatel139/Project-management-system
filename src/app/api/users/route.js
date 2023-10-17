import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//GET request function
export async function GET(request) {
  // const users = [
  //   {
  //     name: "Siddhartha",
  //     phone: "123456789",
  //     position: "SDE",
  //   },
  //   {
  //     name: "Abhiroop",
  //     phone: "34566789",
  //     position: "Tester",
  //   },
  //   {
  //     name: "Kriti",
  //     phone: "5768906789",
  //     position: "UI/UX",
  //   },
  // ];

  let users = [];
  try {
    await connectDB();
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to get users.",
      success: false,
    });
  }

  return NextResponse.json(users);
}

//POST requestfunction
//data post
//Create User
export async function POST(request) {
  const { name, email, password, about, profileUrl } = await request.json();

  //creating user object withuser model

  const user = new User({
    name,
    email,
    password,
    about,
    profileUrl,
  });

  try {
    //Save the object to database
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    console.log(user);
    await connectDB();
    const createdUser = await user.save();

    const response = NextResponse.json(user, {
      status: 201,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create response!!",
        status: false,
      },
      {
        status: 500,
      }
    );
  }

  // const body = request.body;
  // console.log(body);
  // console.log(request.method);
  // console.log(request.cookies);
  // console.log(request.headers);
  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.searchParams);
  // //Taking json data from request
  // const jsonData = await request.json();
  // console.log(jsonData);

  // return NextResponse.json({
  //     message: "Posting user data."
  // })
}

// //DELETE request function
// export function DELETE(request) {
//   console.log("Delete API called.");
//   return NextResponse.json(
//     {
//       messgae: "DELETED!!!",
//       status: true,
//     },
//     { status: 201, statusText: "My Status text" }
//   );
// }

// //PUT request function
// export function PUT() {}
