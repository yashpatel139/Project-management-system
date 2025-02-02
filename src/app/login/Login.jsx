"use client";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import signinSVG from "../../assets/signin.svg";
import Image from "next/image";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log(loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data!!!", {
        position: "top-center",
      });
      return;
    }

    //Login
    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("logged in", {
        position: "top-center",
      });

      context.setUser(result.user);
      //Redirect
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 col-start-4">
        <div className="py-5">
          <div className="my-8 flex justify-center">
            <Image
              src={signinSVG}
              style={{
                width: "40%",
              }}
              alt="sign in logo image"
            />
          </div>
          <h1 className="text-3xl text-center">Login here</h1>
          <form action="#" className="mt-5" onSubmit={loginFormSubmitted}>
            {/* email */}
            <div className="mt-3">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-800 border border-gray-400 text-white"
                id="user_email"
                name="user_email"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    email: event.target.value,
                  });
                }}
                value={loginData.email}
              />
            </div>
            {/* password */}
            <div className="mt-3">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-800 border border-gray-400 text-white"
                id="user_password"
                name="user_password"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    password: event.target.value,
                  });
                }}
                value={loginData.password}
              />
            </div>
            <div className="mt-3 text-center">
              <button
                type="submit"
                className="px-3 py-2 bg-green-600 rounded hover:bg-green-400"
              >
                Login
              </button>
              <button
                type="button"
                className="px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        {/* {JSON.stringify(loginData)} */}
      </div>
    </div>
  );
};

export default Login;
