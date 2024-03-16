import React, { useState, useRef, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "@/firebase/firebaseConfig";
import { Slide } from "react-awesome-reveal";

export default function BlogPosts({
  keyId,
  category,
  heading,
  para,
  likes,
  author,
  date,
  profile,
}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const postCollections = collection(database, "post");

  useEffect(() => {
    // Check if the post is liked by the user in local storage
    const liked = localStorage.getItem(`post_${keyId}_liked`);
    if (liked) {
      setLike(true);
    }

    let getlike = async () => {
      let newdata = await getDocs(postCollections);
      let fltdata = newdata.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      fltdata.map((user) => {
        if (user.id === keyId) {
          setLikeCount(user.likes);
        }
      });
    };
    getlike();
  }, [likeCount]);

  let likecountfunc = async (id) => {
    // Update like state immediately before evaluating conditions
    const postlikes = doc(database, "post", id);

    setLike((prevLike) => !prevLike);
    if (!like) {
      setLikeCount((prevCount) => prevCount + 1);
      let newValue = likeCount + 1;
      await updateDoc(postlikes, {
        likes: newValue,
      });

      // Store in local storage that the user has liked this post
      localStorage.setItem(`post_${id}_liked`, "true");
    } else {
      let newValue = likeCount - 1;
      await updateDoc(postlikes, {
        likes: newValue,
      });

      setLikeCount((prevCount) => Math.max(prevCount - 1, 0));

      // Remove the like status from local storage
      localStorage.removeItem(`post_${id}_liked`);
    }
  };
  return (
    <>
      <div className="md:p-6 p-3 mb-3 md:mb-0 lg:mb-0 lg:w-[49%] w-full overflow-hidden transition duration-300 transform hover:shadow-md hover:-translate-y-1 hover:scale-105    flex flex-col items-start bg-slate-100  rounded-lg">
        <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
          {category}
        </span>
        <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
          {heading}
        </h2>
        <p className="leading-relaxed mb-8">{para}</p>
        <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
          <a className="text-indigo-500 inline-flex items-center cursor-pointer">
            Learn More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div className="ml-auto flex justify-center items-center">
            <BiSolidLike
              onClick={() => {
                likecountfunc(keyId);
              }}
              className={`${
                like ? "text-blue-600" : "text-black"
              } text-xl cursor-pointer`}
            />
            <p className="text-xl ml-3 ">{likeCount}</p>
          </div>
        </div>
        <a className="inline-flex items-center">
          <img
            alt="blog"
            src={`${profile}`}
            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
          />
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-gray-900">
              {author}
            </span>
            <span className="text-gray-400 text-xs tracking-widest mt-0.5">
              {date}
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
