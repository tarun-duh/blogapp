import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database, googleProvider } from "../firebase/firebaseConfig";

export default function Signup({ clicked, popup }) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const error = useRef();

  //current user
  console.log(auth?.currentUser?.email);

  //sign in function
  const signIn = async () => {
    try {
      if (passwordError.length == 0 && emailError.length == 0) {
        signOut(auth);
        console.log("everything looks good so now we can sign up");
        await createUserWithEmailAndPassword(auth, userId, password);
        router.push("blog");
      }
    } catch (err) {
      console.log(err);
      alert("user already exists");
    }
  };

  if (clicked == false) return null;

  return (
    <>
      <div className="overlay flex justify-center items-center w-screen h-screen">
        <div className="relative shadow-2xl p-6 rounded-lg flex flex-col justify-center items-center h-fit w-1/4 bg-white text-black overflow-hidden">
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
                  First name
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className=" w-full">
            <label className=" block text-sm font-medium leading-6 text-gray-900">
              Email address
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p ref={error} className="text-red-600 text-sm mt-2 ">
                {emailError}
              </p>
            </div>
          </div>

          <div className=" w-full my-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Create Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                type="password"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600 text-sm mt-2">{passwordError}</p>
            </div>
          </div>

          <div className=" w-full flex justify-center">
            <button
              onClick={signIn}
              className="my-2 flex h-11  w-3/5 justify-center items-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
