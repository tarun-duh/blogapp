import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database, googleProvider } from "../firebase/firebaseConfig";
import { IoMdEye } from "react-icons/io";
import Login from "./Login";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Signup({ clicked, popup }) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const error = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [loginClicked, setLoginCliked] = useState(false);
  const divref = useRef(null);
  const userCollections = collection(database, "users");

  //animation
  useEffect(() => {
    if (clicked) {
      gsap.fromTo(
        "#singUpBox",
        { x: "100vw" },
        { x: 0, ease: "power2.inOut", duration: 1 }
      );
    }
  }, [clicked]);

  //sign up function
  const signUp = async () => {
    try {
      if (passwordError.length == 0 && emailError.length == 0) {
        signOut(auth);
        await createUserWithEmailAndPassword(auth, userId, password);
        router.push("blog");

        //here we are retrieving the users date from the firebase to check if we already have the data of the  user that just logged in.
        await addDoc(userCollections, {
          email: auth?.currentUser?.email,
          password: password,
          username: firstName + " " + LastName,
        });
      }
    } catch (err) {
      if (userId.length > 0 && password.length > 0 && firstName.length > 0) {
        setPasswordError("user already exists");
      } else {
        setPasswordError("Please fill in  the required fields.");
      }
      console.log(err);
    }
  };
  const showPass = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  function closePopup() {
    popup();
    setLoginCliked(false);
  }
  function login() {
    divref.current.style.display = "none";
    setLoginCliked(true);
  }

  if (clicked == false) return null;

  return (
    <>
      <div
        ref={divref}
        className="overlay flex justify-center items-center w-screen h-screen"
      >
        <div
          id="singUpBox"
          className="relative translate-x-[100vw] shadow-2xl md:p-6 p-5 rounded-lg flex flex-col justify-center items-center h-fit md:w-1/2 lg:w-1/4 w-80 bg-white text-black overflow-hidden"
        >
          <IoMdClose
            onClick={() => {
              setFirstName("");
              setEmailError("");
              setLastName("");
              setPasswordError("");
              setUserId("");
              setPassword("");
              popup();
            }}
            className="h-6 cursor-pointer w-6 closeButton text-black"
          />
          <div className="w-full flex gap-2">
            <div className=" w-1/2 my-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First name*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" w-1/2 my-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastname"
                  value={LastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className=" w-full">
            <label className=" block text-sm font-medium leading-6 text-gray-900">
              Email address*
            </label>
            <div className="mt-2">
              <input
                id="user"
                name="emailId"
                type="email"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  const newvalue = e.target.value;
                  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                  if (newvalue.length == 0) {
                    setEmailError("");
                  } else {
                    if (!emailRegex.test(newvalue)) {
                      setEmailError("please write a valid email address");
                    } else {
                      setEmailError("");
                    }
                  }
                }}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p ref={error} className="text-red-600 text-sm mt-2 ">
                {emailError}
              </p>
            </div>
          </div>

          <div className=" w-full my-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Create Password*
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  let newvalue = e.target.value;
                  setPassword(newvalue);
                  if (newvalue.length < 8) {
                    setPasswordError("password must be 8 characters");
                  } else {
                    setPasswordError("");
                  }
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <IoMdEye
                onClick={showPass}
                className={`text-black h-4 w-6  absolute  cursor-pointer right-1 ${
                  passwordError.length < 1 ? "top-1/4" : "bottom-9"
                }`}
              />
              <p className="text-red-600 text-sm mt-2">{passwordError}</p>
            </div>
          </div>

          <div className=" w-full flex justify-center">
            <button
              onClick={signUp}
              className="my-2 flex h-11  w-3/5 justify-center items-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Sign up
            </button>
          </div>
          <div>
            <p className="text-black text-center mt-2">
              Already have an account?
              <b onClick={login} className="text-blue-600 mx-2 cursor-pointer">
                Sign in
              </b>
            </p>
          </div>
        </div>
      </div>
      <Login clicked={loginClicked} popup={closePopup} />
    </>
  );
}
