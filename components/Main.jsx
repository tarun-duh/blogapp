import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Login from "./Login";
import Signup from "./Signup";
import { FaUserCircle } from "react-icons/fa";
import { auth, googleProvider, database } from "../firebase/firebaseConfig";
import Layout from "./Layout";
import { getDocs, collection } from "firebase/firestore";
import BlogPosts from "./BlogPosts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const postcollections = collection(database, "post");

  const [loginClicked, setLoginCliked] = useState(false);
  const [signupClicked, setSignupCliked] = useState(false);

  //timeline for animations
  let timeline = gsap.timeline({});
  useGSAP(() => {
    timeline.to(".heading", {
      opacity: 1,
      y: -10,
      delay: 0.5,
    });
    timeline.to(".subHead", {
      opacity: 1,
      y: -10,
    });
    timeline.to(".btn", {
      opacity: 1,
      delay: 0.1,
    });
  }, []);

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
        filterData.sort((a, b) => b.likes - a.likes);
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
    <>
      <Layout login={login} signup={signup}>
        <div className="w-full h-screen ">
          <div
            id="main"
            className="lg:h-5/6 md:h-[60vh] h-[450px]  md:pt-28 md:px-11 pt-24 px-5 pb-6 w-full flex  justify-center   "
          >
            <div className="over"></div>

            <div className="flex h-full w-full flex-col md:w-1/2 justify-center z-10">
              <h1 className="text-[30px] heading  opacity-0 translate-y-10   font-bold md:text-4xl md:mb-2 lg:text-6xl  text-orange-500">
                Stay curious.
              </h1>
              <p className="text-[20px] mt-2 mb-4 text-white subHead translate-y-10 opacity-0 ">
                Discover stories, thinking, and expertise from writers on any
                topic.
              </p>
              <div>
                <a
                  onClick={signup}
                  className="btn opacity-0  inline-block cursor-pointer text-white font-medium py-2 px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-800 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out text-[18px]"
                >
                  Start reading
                </a>
              </div>
            </div>
            <div className="w-1/2 hidden md:block"></div>
          </div>
          <div className="md:p-10 md:py-14 sm:p-6 p-6  ">
            <h1 className="text-2xl font-semibold md:text-4xl mb-3 heading  opacity-0 translate-y-10 ">
              what's trending on Blogyou?
            </h1>
            <div className="z-0 w-full md:flex lg:flex flex-wrap  md:pt-1  gap-3 ">
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
          {signupClicked && (
            <Signup clicked={signupClicked} popup={closePopup} />
          )}
        </div>
      </Layout>
    </>
  );
}
