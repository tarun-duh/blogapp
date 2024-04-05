import React, { useState, useEffect } from "react";
import blogyou from "../public/images/newlogo.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { database, auth } from "../firebase/firebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";
import Layout from "@/components/Layout";

export default function write() {
  const router = useRouter();
  const [categoryIn, setCategoryIn] = useState("");
  const [title, setTitle] = useState("");
  const [paraIn, setParaIn] = useState("");
  const [userId, setUserId] = useState("");
  const [author, setAuthor] = useState("anonymous");

  const postCollections = collection(database, "post");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthor(user.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  const publishfunc = async () => {
    console.log("puplish funct");
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
        await addDoc(postCollections, {
          author: author,
          heading: title,
          paragraph: paraIn,
          date: dateInString,
          category: categoryIn,
          useremail: auth?.currentUser?.email,
          likes: 0,
        });
        router.push("/blog");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout publish={publishfunc}>
      <div className="h-screen w-screen">
        <div className="w-full  h-4/5 md:pt-32 md:px-10 md:pb-10 pt-24 px-4 pb-10">
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
    </Layout>
  );
}
