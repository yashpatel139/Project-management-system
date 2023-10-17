import { NextResponse } from "next/server";

export function GET(request, {params}) {
    const {userId, postId} = params;
    console.log("User Id = ", userId);
    console.log("Post Id = ", postId);

    return NextResponse.json(params);
}