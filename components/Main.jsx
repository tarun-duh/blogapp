import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import blog from "../public/images/blog.jpg";
import blogyou from "../public/images/newlogo.png";
import Login from "./Login";
import Signup from "./Signup";
import { FaUserCircle } from "react-icons/fa";
import { auth, googleProvider } from "../firebase/firebaseConfig";

export default function Main() {
  const router = useRouter();
  const [loginClicked, setLoginCliked] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);
  const [hamburgerOn, setfirstHamburgerOn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("blog");
      }
    });

    return () => unsubscribe();
  }, []);

  function login() {
    setLoginCliked(true);
  }

  function signup() {
    setSignupCliked(true);
  }
  function closePopup() {
    setLoginCliked(false);
    setSignupCliked(false);
  }
  return (
    <>
      <div className="w-full h-screen ">
        <header>
          <nav className="fixed inset-x-0 top-0 z-10 w-full p-4 sm:p-6 bg-white shadow-md border-slate-500  transition ">
            <div className="flex justify-between ">
              <div className="flex">
                <div className="text-[1.5rem]   leading-[3rem] tracking-tight font-semibold text-black ">
                  <a href="/">
                    <Image
                      className="w-30 md:w-48"
                      priority={true}
                      src={blogyou}
                      alt="My Image"
                      width={180}
                      height={"auto"}
                    />
                  </a>
                </div>
              </div>
              <div className="md:hidden p-1 h-9 flex items-center justify-center">
                <FaUserCircle
                  onClick={login}
                  className="text-orange-400 text-2xl "
                />
              </div>
              <div className="md:flex hidden">
                <div className="text-[1rem] leading-[3rem] tracking-tight  text-black dark:text-white">
                  <blogyou />
                </div>
                <div className="flex items-center space-x-4 text-base font-medium tracking-tight">
                  <button
                    onClick={login}
                    // style={{
                    //   backgroundColor: "#4A732D",
                    // }}
                    className="px-5 py-2  text-black   bg-white border border-white rounded-full hover:border-black hover:border hover:text-gray-450  "
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
        <div className="md:h-3/4 h-96  md:pt-28 md:px-11 pt-10 px-5 pb-6 w-full flex  justify-center   ">
          <div className="flex h-full w-full flex-col md:w-1/2 justify-center">
            <h1 className="text-3xl font-bold md:text-6xl md:mb-2  text-orange-500">
              Stay curious.
            </h1>
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
          <div className="hidden w-3/5 h-full md:flex justify-end items-center">
            <Image
              className="w-96 md:w-2/3"
              priority={true}
              src={blog}
              alt="My Image"
              width={"auto"}
              height={350}
            />
          </div>
        </div>
        <div className="text-xl">what's trending on Blogyou</div>
        {loginClicked && <Login clicked={loginClicked} popup={closePopup} />}
        {signupClicked && <Signup clicked={signupClicked} popup={closePopup} />}
      </div>
    </>
  );
}
