import React, { useState, useEffect } from "react";
import blogyou from "../public/images/newlogo.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { database, auth } from "../firebase/firebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";

export default function write() {
  const router = useRouter();
  const [categoryIn, setCategoryIn] = useState("");
  const [title, setTitle] = useState("");
  const [paraIn, setParaIn] = useState("");
  const [userId, setUserId] = useState("");
  const [author, setAuthor] = useState("anonymous");

  const postcollections = collection(database, "post");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(auth?.currentUser);
        setAuthor(user.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  const publishfunc = async () => {
    if (title.length < 1 || paraIn.length < 1 || categoryIn.length < 1) {
      alert("please fill the inputs");
    } else {
      try {
        let currentDate = new Date();
        let dateInString = currentDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        console.log("hey public func", title, paraIn, categoryIn);
        await addDoc(postcollections, {
          author: author,
          heading: title,
          paragraph: paraIn,
          date: dateInString,
          category: categoryIn,
        });
        router.push("/blog");
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(author, "hey");

  return (
    <div className="h-screen w-screen">
      <header className=" w-full shadow-sm ">
        <div className=" w-full  flex  p-5  items-center justify-between ">
          <div className="flex justify-center items-center">
            <a
              onClick={() => {
                router.push("/blog");
              }}
              className="cursor-pointer   flex title-font font-medium items-center  justify-center text-gray-900  "
            >
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
          <div className="flex ">
            <nav className=" flex  items-center text-base mr-8 justify-center text-black hover:text-gray-500"></nav>
            <button
              onClick={publishfunc}
              className="px-6 py-2 mr-3 shadow-2xl shadow-slate-400 text-white text-xs transition duration-600 ease-out bg-lime-600 rounded-full hover:bg-green-800 hover:ease-in "
            >
              Publish
            </button>
            <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  ">
              <FaUserCircle className="text-3xl text-orange-500" />
            </button>
          </div>
        </div>
      </header>
      <div className="w-full  h-4/5 p-10">
        <input
          className="w-full font-serif  outline-none  border-b-2 border-gray-100 p-3  break-all text-lg"
          type="text"
          placeholder="Category"
          value={categoryIn}
          onChange={(e) => setCategoryIn(e.target.value)}
        />
        <textarea
          className="scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-slate-300 w-full my-2 p-3 font-serif outline-none border-b-2 border-gray-100 break-all text-2xl"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="scrollbar-none w-full  h-5/6   overflow-y-scroll">
          <textarea
            className="scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-slate-300  h-full outline-none text-lg font-serif p-3 w-full break-all resize-none"
            type="text"
            placeholder="Tell your story…"
            value={paraIn}
            onChange={(e) => setParaIn(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
