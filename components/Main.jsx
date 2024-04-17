import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import blog from "../public/images/blog.jpg";
import blogyou from "../public/images/newlogo.png";
import Login from "./Login";
import Signup from "./Signup";
import { FaUserCircle } from "react-icons/fa";
import { auth, googleProvider, database } from "../firebase/firebaseConfig";
import Layout from "./Layout";
import { getDocs, collection } from "firebase/firestore";
import BlogPosts from "./BlogPosts";
import background from "../public/background1.jpg";

export default function Main() {
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const postcollections = collection(database, "post");

  const [loginClicked, setLoginCliked] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);
  const [hamburgerOn, setfirstHamburgerOn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/blog");
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    let getPostList = async () => {
      try {
        let listData = await getDocs(postcollections);
        const filterData = listData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        filterData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPostList(filterData);
      } catch (err) {
        console.error("Error getting documents: ", err);
      }
    };
    getPostList();
  }, []);

  function login() {
    setLoginCliked(true);
  }

  function signup() {
    setSignupCliked(true);
  }
  function closePopup() {
    setLoginCliked(false);
    setSignupCliked(false);
  }
  return (
    <Layout login={login} signup={signup}>
      <div className="w-full h-screen ">
        <div
          id="main"
          className="md:h-3/4 h-96  md:pt-28 md:px-11 pt-24 px-5 pb-6 w-full flex  justify-center   "
        >
          <div className="over"></div>

          <div className="flex h-full w-full flex-col md:w-1/2 justify-center z-10">
            <h1 className="text-[30px] font-bold md:text-4xl md:mb-2 lg:text-6xl  text-orange-500">
              Stay curious.
            </h1>
            <p className="text-[20px] mt-2 mb-4 text-white">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <div>
              <a
                onClick={signup}
                className="inline-block cursor-pointer text-white font-medium py-2 px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-800 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out text-[18px]"
              >
                Start reading
              </a>
            </div>
          </div>
          <div className="w-1/2 hidden sm:block"></div>
        </div>
        <div className="md:p-10 sm:p-6 p-4 ">
          <h1 className="sm:text-2xl mb-3">what's trending on Blogyou</h1>
          <div className="z-0 mt-20 w-full md:flex lg:flex flex-wrap lg:pr-4 lg:pl-8 p-3 md:pt-6  gap-3 ">
            {postList.map((post, index) => (
              <BlogPosts
                key={index}
                keyId={post.id}
                category={post.category}
                heading={post.heading}
                para={post.paragraph}
                author={post.author}
                date={post.date}
                profile={post.profile}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
        {loginClicked && <Login clicked={loginClicked} popup={closePopup} />}
        {signupClicked && <Signup clicked={signupClicked} popup={closePopup} />}
      </div>
    </Layout>
  );
}
