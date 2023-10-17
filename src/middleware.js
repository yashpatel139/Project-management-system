import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("Middleware Executed");
    const authToken = request.cookies.get("authToken")?.value;
    //login and signup botha are public api anyone can access them
    if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/users") {
        return;
    }

    const loggedInUsersNotAccessPaths = request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/signup";

    if(loggedInUsersNotAccessPaths){
        //accessing not secured routes
        if(authToken){
            return NextResponse.redirect(new URL("/profile/user", request.url));
        }
    }else{
        //accessing secured routes
        if(!authToken){
          if(request.nextUrl.pathname.startsWith("/api")){
            return NextResponse.json({
              message: "Access Denied!!",
              success: false,
            }, 
            {
              success: 401,
            });
          }
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    console.log(authToken);



  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-tasks",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
