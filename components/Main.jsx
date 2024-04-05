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
import Layout from "./Layout";

export default function Main() {
  const router = useRouter();
  const [loginClicked, setLoginCliked] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);
  const [hamburgerOn, setfirstHamburgerOn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/blog");
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
    <Layout login={login} signup={signup}>
      <div className="w-full h-screen ">
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
    </Layout>
  );
}
