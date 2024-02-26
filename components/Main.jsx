import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import blog from "../public/images/blog.jpg";
import blogyou from "../public/images/newlogo.png";
import Login from "./Login";
import Signup from "./Signup";

export default function Main() {
  const router = useRouter();
  const [loginClicked, setLoginCliked] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);

  function login() {
    // router.push("login");
    console.log("login clicked");
    setLoginCliked(true);
  }
  function signup() {
    // router.push("signup");
    console.log("signup clicked");
    setSignupCliked(true);
  }
  function closePopup() {
    console.log("hey", loginClicked);
    setLoginCliked(false);
    setSignupCliked(false);
  }
  return (
    <>
      <div className="w-full h-screen ">
        <header>
          <nav className="fixed inset-x-0 top-0 z-10 w-full px-6 py-6  bg-white shadow-md border-slate-500  transition ">
            <div className="flex justify-between ">
              <div className="flex">
                <div className="text-[1.5rem] leading-[3rem] tracking-tight font-semibold text-black dark:text-white">
                  <a href="/">
                    <Image
                      priority={true}
                      src={blogyou}
                      alt="My Image"
                      width={180}
                      height={"auto"}
                    />
                  </a>
                </div>
              </div>
              <div className="flex">
                <div className="text-[1rem] leading-[3rem] tracking-tight  text-black dark:text-white">
                  <blogyou />
                </div>
                <div className="flex items-center space-x-4 text-base font-medium tracking-tight">
                  <button
                    onClick={login}
                    // style={{
                    //   backgroundColor: "#4A732D",
                    // }}
                    className="px-6 py-2  text-white transition duration-700 ease-out  bg-orange-500 border border-white rounded-full hover:bg-blue-800 hover:border hover:text-white  "
                  >
                    Sign in
                  </button>
                  <button
                    onClick={signup}
                    className="px-6 py-2 shadow-2xl shadow-slate-400 text-white transition duration-600 ease-out bg-purple-800 rounded-full hover:bg-green-900 hover:ease-in "
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="h-3/4  pt-28 px-14 pb-6 w-full flex  justify-center   ">
          <div className="flex h-full flex-col w-1/2 justify-center">
            <h1 className="text-[4.5rem]  text-orange-500">Stay curious.</h1>
            <p className="text-xl mt-2 mb-4">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <div>
              <a
                onClick={signup}
                className="inline-block cursor-pointer text-white font-medium py-2 px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-800 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out"
              >
                Start reading
              </a>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-end items-center">
            <Image
              priority={true}
              src={blog}
              alt="My Image"
              width={"auto"}
              height={350}
            />
          </div>
        </div>
        <div className="text-xl">what's trending on Blogyou</div>
        <Login clicked={loginClicked} popup={closePopup} />
        <Signup clicked={signupClicked} popup={closePopup} />
      </div>
    </>
  );
}
