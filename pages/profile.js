import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { MdModeEdit } from "react-icons/md";
import { database } from "@/firebase/firebaseConfig";
import Profilepopup from "@/components/Profilepopup";
import BlogPosts from "@/components/BlogPosts";

import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function profile() {
  const userCollections = collection(database, "users");
  const postcollections = collection(database, "post");

  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const [name, setName] = useState("Anonymous");
  const [profile, setProfile] = useState(
    "https://images.pexels.com/photos/7755619/pexels-photo-7755619.jpeg?auto=compress&cs=tinysrgb&w=600"
  );
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.pexels.com/photos/17096705/pexels-photo-17096705/free-photo-of-sereno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [email, setEmail] = useState(null);
  const [editClicked, setEditClicked] = useState(false);

  const logout = async () => {
    try {
      signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      }
      let getPostList = async () => {
        try {
          let listData = await getDocs(postcollections);
          const filterData = listData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(filterData, "hey");
          let newfilterdata = filterData.filter((x, i, arr) => {
            if (x.useremail == auth?.currentUser?.email) {
              return x;
            }
          });
          console.log(newfilterdata, auth?.currentUser?.email);
          setPostList(newfilterdata);
          let usersdata = await getDocs(userCollections);
          const filterUsers = usersdata.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        } catch (err) {
          console.error("Error getting documents: ", err);
        }
      };
      getPostList();
    });
    let getUserDate = async () => {
      try {
        let listData = await getDocs(userCollections);
        const filterData = listData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        for (let i of filterData) {
          if (auth?.currentUser?.email == i.email) {
            setProfile(i.userPfp);
            setBackgroundImg(i.userBg);
            setName(i.username);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserDate();
    return () => unsubscribe();
  }, [editClicked]);

  const getAllCollections = async () => {
    // const collections = await database.listCollections();
    console.log(database);
    // const collectionIds = collections.map((collection) => collection.id);
    // return collectionIds;
  };

  let closeEdit = () => {
    setEditClicked(false);
  };
  return (
    <Layout logOut={logout}>
      <div className=" h-[400px] w-full bg-black md:pt-20  pt-16 overflow-hidden ">
        <img
          className="displayImg h-full w-full bg-cover object-cover"
          src={backgroundImg}
          alt="img"
        />
      </div>
      <div className=" md:h-50 h-34 bg-white flex md:px-6 lg:px-10 md:py-3 px-4 py-3 md:pt-3 md:pb-8 shadow-md">
        <div className="flex-2 displayImg rounded-full border-black border-2 sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px]   lg:h-[250px] lg:w-[250px] h-[135px] w-[135px]  overflow-hidden bg-cover bg-no-repeat sm:mt-[-70px] lg:mt-[-100px] md:mt-[-90px] mt-[-50px] ">
          <img
            className=" h-full w-full displayImg object-cover"
            src={profile}
            alt="pfpimg"
          />
        </div>
        <div className="flex-1 h-50  md:px-6 pl-3 md:py-3 py-1 relative">
          <h1 className="md:text-xl text-base  font-semibold">{name}</h1>
          <p className="md:text-lg text-sm">{email}</p>
          <div
            onClick={() => {
              console.log("edit clicked");
              setEditClicked(true);
            }}
            className="transition duration-300 transform hover:shadow-md  hover:scale-105 px-2 py-1 cursor-pointer absolute flex items-center justify-center top-0 right-0 text-blue-600 gap-1 md:text-lg text-sm"
          >
            <MdModeEdit className="" />
            <p className="">Edit</p>
          </div>
        </div>
      </div>
      <Profilepopup
        active={editClicked}
        closefunc={closeEdit}
        profile={profile}
        backgroundImg={backgroundImg}
      />
      <div className="">
        <h1 className="text-2xl text-gray-500 lg:pl-8 pt-10 ">Your posts</h1>
        <div className="0  w-full md:flex lg:flex flex-wrap lg:pr-4 lg:pl-8 p-3 pb-10  gap-3 ">
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
    </Layout>
  );
}
