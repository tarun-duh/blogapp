import React, { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function profile() {
  const backgroundImg =
    "https://images.pexels.com/photos/17096705/pexels-photo-17096705/free-photo-of-sereno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const profile =
    "url(https://images.pexels.com/photos/7755619/pexels-photo-7755619.jpeg?auto=compress&cs=tinysrgb&w=600)";
  const router = useRouter();
  const [name, setName] = useState("Anonymous");
  const logout = async () => {
    try {
      signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className=" bg-black md:pt-20  pt-16 overflow-hidden">
        <img
          className=" md:h-80 h-60 w-full bg-cover "
          src={backgroundImg}
          alt="img"
        />
      </div>
      <div className="md:h-50 h-34 bg-white flex md:px-12 md:py-3 px-3 py-3 shadow-sm">
        <div
          style={{
            backgroundImage: `${profile}`,
          }}
          className="displayImg rounded-full md:h-60  h-28 bg-red-400 md:w-1/6 w-2/6 md:mt-[-120px] mt-[-60px] p-2 overflow-hidden "
        ></div>
        <div className="w-4/6 h-50  md:px-6 px-3 md:py-3 py-1 ">
          <h1 className="md:text-xl text-lg  font-semibold">{name}</h1>
          <p className="md:text-lg text-base">{auth?.currentUser?.email}</p>
        </div>
      </div>
      <div className=" bg-white p-8 rounded-lg shadow-md  mt-3">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Log out
        </button>
      </div>
    </Layout>
  );
}
