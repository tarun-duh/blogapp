import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState, useRef } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";

export default function Login() {
  // const router = useRouter();
  // () => {
  //   router.push("/");
  // }
  const [userId, setUserId] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const error = useRef();

  console.log(auth?.currentUser?.email);
  const signIn = async (e, userId, password) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    console.log(userId, auth, password);
    // await createUserWithEmailAndPassword(auth, userId, password);
  };

  return (
    <>
      <div className="shadow-2xl p-6 rounded-lg flex flex-col justify-center items-center h-1/3 w-1/4 bg-white text-white">
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
                    console.log(newvalue, emailRegex);
                    setEmailError("please write a valid email address");
                  } else {
                    setEmailError("");
                  }
                }
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p ref={error} className="text-red-600 text-sm ">
              {emailError}
            </p>
          </div>
        </div>

        <div className=" w-full my-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            {/* <div className="text-sm">
              <a
                href="#"
                className="mx-2 font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div> */}
          </div>
          <div className="mt-2">
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className=" w-full flex gap-2">
          <button
            onClick={signIn}
            className="my-2 flex h-10  w-2/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          <button
            onClick={signIn}
            className="my-2 flex h-10  w-2/5 justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Sign up
          </button>
          <div className="w-1/5 flex justify-end">
            <button
              onClick={signIn}
              className="my-2 flex  items-center h-10  w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-medium leading-6 text-white border-2  shadow-2xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <FcGoogle className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
