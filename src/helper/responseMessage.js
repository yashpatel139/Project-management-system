import { NextResponse } from "next/server"

export const getResponseMessage = (messageTest, statusCode, successStatus) => {
    return NextResponse.json({
        message: messageTest,
        success: successStatus
    }, 
    {
        status: statusCode
    })
}