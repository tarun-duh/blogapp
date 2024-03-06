import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, database } from "../firebase/firebaseConfig";
import Image from "next/image";
import blogyou from "../public/images/newlogo.png";
import { FaUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import BlogPosts from "@/components/BlogPosts";
import { getDocs, collection } from "firebase/firestore";

export default function blog() {
  const [postList, setPostList] = useState([]);
  const postcollections = collection(database, "post");

  useEffect(() => {
    let getPostList = async () => {
      try {
        let listData = await getDocs(postcollections);
        const filterData = listData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filterData);
        setPostList(filterData);
        // setPostList(ftrData);
      } catch (err) {
        console.error("Error getting documents: ", err);
      }
    };
    getPostList();
  }, []);

  const router = useRouter();
  const logout = async () => {
    try {
      signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(postList[0].category);
  return (
    <div className="bg-white h-screen w-screen ">
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
            <input
              type="text"
              placeholder="search"
              className="h-auto w-auto bg-gray-100 ml-6 rounded-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex ">
            <nav className=" flex  items-center text-base mr-8 justify-center text-black hover:text-gray-500">
              <a
                onClick={() => {
                  router.push("/write");
                }}
                className="cursor-pointer flex items-center justify-center "
              >
                <FaRegEdit className="text-l  " />
                <p className=" text-l ml-2  ">Write</p>
              </a>
            </nav>
            <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  ">
              <FaUserCircle className="text-3xl text-orange-500" />
            </button>
          </div>
        </div>
      </header>
      <div className="w-full md:flex flex-wrap p-4 justify-center gap-3">
        <BlogPosts
          category="Sports"
          heading="Top ten best football player "
          para="alsnajskdjasdlsmxnasijnxiasnchsuhcccsac askjcna aiusnakscc asca"
          author="Tarun singh"
          date="06/03/2024"
          profile=""
        />
        <BlogPosts category={postList.category} />
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
    </div>
  );
}
