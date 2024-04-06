import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import Signup from "./Signup";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, database } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRef } from "react";

export default function Login({ clicked, popup }) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const error = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);
  const userCollections = collection(database, "users");

  const divref = useRef(null);
  // useEffect(() => {
  //   auth?.currentUser && router.push("blog");
  // }, [auth?.currentUser]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, userId, password);
      setUserId("");
      setPassword("");
      router.push("blog");
    } catch (err) {
      console.log(err);
      if (userId.length > 0 || password.length > 0) {
        setPasswordError("invalid username or password");
      } else {
        setPasswordError(
          "Please fill in both the user ID and password fields."
        );
      }
    }
  };
  const googleSign = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("blog");
      let userlist = await getDocs(userCollections);
      let filterusers = userlist.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //array for all the users in the database
      let arr = [];
      filterusers.map((user) => {
        arr.push(user.email);
      });

      //checking if the user that just logged in is already in the database or not
      if (!arr.includes(auth?.currentUser?.email)) {
        console.log("not includes");
        await addDoc(userCollections, {
          email: auth?.currentUser?.email,
          password: password,
          username: auth?.currentUser?.displayName,
          userPfp: "asdasdasda",
          userBg: "asdadsdasdas",
        });
      }
      setUserId("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  function closePopup() {
    popup();
    setSignupCliked(false);
  }

  function signup() {
    divref.current.style.display = "none";
    setSignupCliked(true);
  }

  const showPass = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  if (clicked == false) return null;

  return (
    <>
      <div ref={divref} className="overlay">
        <div className="flex justify-center items-center  h-screen w-screen  ">
          <div className="shadow-2xl md:px-6 pt-12 pb-6 px-5  rounded-lg flex flex-col justify-center items-center h-fit md:w-1/2 lg:w-1/4 w-80 bg-white text-white overflow-hidden relative ease-in ">
            <IoMdClose
              onClick={() => {
                setPassword("");
                setEmailError("");
                setUserId("");
                popup();
              }}
              className="h-6 cursor-pointer w-6 closeButton text-black"
            />
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
                    setPasswordError("");
                    setUserId(e.target.value);
                    const newvalue = e.target.value;
                    const emailRegex =
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
                  className="block w-full p-1.5 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="mt-2 relative">
                <input
                  id="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <IoMdEye
                  onClick={showPass}
                  className={`text-black h-4 w-6 absolute ${
                    passwordError.length < 1 ? "top-1/4" : "bottom-9"
                  }  cursor-pointer right-1`}
                />
                <p className="text-red-600 text-sm mt-2 ">{passwordError}</p>
              </div>
            </div>

            <div className=" w-full flex flex-col gap-2 ">
              <button
                onClick={() => signIn()}
                type="submit"
                className="my-2 flex h-10  w-full justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>

              <div className="w-full  ">
                <button
                  onClick={() => googleSign()}
                  className="mb-2 flex   items-center h-10  w-full rounded-full bg-white px-3 py-1.5 text-sm font-medium leading-6 text-black border-2  shadow-2xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <FcGoogle className="text-2xl self-start" />
                  <p className="self-center w-full">login with google</p>
                </button>
                <p className="text-black text-center mt-6">
                  don't have an account?{" "}
                  <b onClick={signup} className="text-blue-600 cursor-pointer">
                    sign up
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {signupClicked && <Signup clicked={signupClicked} popup={closePopup} />}
    </>
  );
}
