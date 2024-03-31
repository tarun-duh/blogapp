import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { MdModeEdit } from "react-icons/md";
import { database } from "@/firebase/firebaseConfig";
import Profilepopup from "@/components/Profilepopup";

export default function profile() {
  const backgroundImg =
    "https://images.pexels.com/photos/17096705/pexels-photo-17096705/free-photo-of-sereno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const profile =
    "url(https://images.pexels.com/photos/7755619/pexels-photo-7755619.jpeg?auto=compress&cs=tinysrgb&w=600)";
  const router = useRouter();
  const [name, setName] = useState("Anonymous");
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
    });

    return () => unsubscribe();
  }, []);

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
      <div className=" bg-black md:pt-20  pt-16 overflow-hidden">
        <img
          className=" md:h-80 h-60 w-full bg-cover "
          src={backgroundImg}
          alt="img"
        />
      </div>
      <div className="md:h-50 h-34 bg-white flex md:px-12 md:py-3 px-3 py-3 md:pt-3 md:pb-8 shadow-md">
        <div
          style={{
            backgroundImage: `${profile}`,
            backgroundSize: "cover",
          }}
          className="displayImg rounded-full md:h-60  h-28 bg-red-400 md:w-1/6 w-2/5 md:mt-[-120px] mt-[-60px] p-2 overflow-hidden "
        ></div>
        <div className="w-5/6 h-50  md:px-6 pl-3 md:py-3 py-1 relative">
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
          <div>
            <button
              onClick={() => {
                getAllCollections();
              }}
              className="bg-orange-500 p-2 rounded-lg text-white"
            >
              My blogs
            </button>
            <button className="bg-blue-600 p-2 rounded-lg text-white">
              Liked blogs
            </button>
          </div>
        </div>
      </div>
      <Profilepopup active={editClicked} closefunc={closeEdit} />
      <div className=""></div>
    </Layout>
  );
}
