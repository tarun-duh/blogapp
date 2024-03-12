import React from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function profile() {
  const router = useRouter();
  const logout = async () => {
    try {
      signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
    </>
  );
}
