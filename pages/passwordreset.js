import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";

export default function passwordreset() {
  let [email, setEmail] = useState("");
  const router = useRouter();

  async function handleEmailRest() {
    let emailVal = email;
    try {
      await sendPasswordResetEmail(auth, emailVal);
      alert("check your email");
      setEmail("");
      router.push("/");
    } catch (err) {
      alert("invalid email");
      console.log(err);
    }
  }
  return (
    <div className="overlay flex justify-center items-center">
      <div className="bg-white h-fit sm:w-[400px] md:w-[500px] lg:w-[500px] py-10 lg:p-6 md:p-5 sm:p-3 px-4 w-[330px] flex flex-col relative">
        <IoMdClose
          onClick={() => {
            setEmail("");
            router.push("/");
          }}
          className="h-6 cursor-pointer w-6 closeButton text-black "
        />
        <h1 className="text-2xl text-green-400 py-4 text-center">
          Reset your Password
        </h1>
        <input
          className="h-[40px] w-full border-2 p-2 border-black"
          type="email"
          placeholder="your @email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name=""
          id=""
        />
        <button
          onClick={handleEmailRest}
          className="bg-blue-600 p-2 rounded-md text-white mt-4 w-[130px] h-[45px] self-center "
        >
          Send Email
        </button>
      </div>
    </div>
  );
}
