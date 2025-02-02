"use client";
import React, { useState } from "react";
import signupSVG from "../../assets/signup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileUrl:
      "https://www.ispneurosurgery.org/wp-content/uploads/2017/03/GenericProfilePhoto-Blue-Round.png",
  });

  const doSignUp = async (evevt) => {
    event.preventDefault();
    console.log(event);
    console.log(data);
    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Username is required!!!", {
        position: "top-center",
      });
      return;
    }

    // Form Submit
    try {
      const result = await signUp(data);
      console.log(result);
      toast.success("User is registered!!", {
        position: "top-center",
      });
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileUrl:
          "https://www.ispneurosurgery.org/wp-content/uploads/2017/03/GenericProfilePhoto-Blue-Round.png",
      });
    } catch (error) {
      console.log(error);
      toast.error("Sign up error!!" + error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      profileUrl:
        "https://www.ispneurosurgery.org/wp-content/uploads/2017/03/GenericProfilePhoto-Blue-Round.png",
    });
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 col-start-4">
        <div className="py-5">
          <div className="my-8 flex justify-center">
            <Image
              src={signupSVG}
              style={{
                width: "30%",
              }}
              alt="sign up logo image"
            />
          </div>
          <h1 className="text-3xl text-center">Signup here</h1>
          <form action="#" className="mt-5" onSubmit={doSignUp}>
            {/* name */}
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-white border border-gray-400 text-white"
                id="user_name"
                name="user_name"
                onChange={(event) => {
                  setData({
                    ...data,
                    name: event.target.value,
                  });
                }}
                value={data.name}
              />
            </div>
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
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-white border border-gray-400 text-white"
                id="user_email"
                name="user_email"
                onChange={(event) => {
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                }}
                value={data.email}
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
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-white border border-gray-400 text-white"
                id="user_password"
                name="user_password"
                onChange={(event) => {
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                }}
                value={data.password}
              />
            </div>
            {/* about */}
            <div className="mt-3">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2 ps-2"
              >
                About
              </label>
              <textarea
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-white border border-gray-400 text-white"
                id="user_about"
                rows={8}
                name="user_about"
                onChange={(event) => {
                  setData({
                    ...data,
                    about: event.target.value,
                  });
                }}
                value={data.about}
              ></textarea>
            </div>
            <div className="mt-3 text-center">
              <button
                type="submit"
                className="px-3 py-2 bg-green-600 rounded hover:bg-green-400"
              >
                SignUp
              </button>
              <button type="button" onClick={resetForm} className="px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400">
                Reset
              </button>
            </div>
            {/* {JSON.stringify(data)} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
