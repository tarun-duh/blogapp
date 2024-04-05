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
import Layout from "@/components/Layout";

export default function blog() {
  const [postList, setPostList] = useState([]);
  const postcollections = collection(database, "post");
  const userCollections = collection(database, "users");

  const router = useRouter();

  useEffect(() => {
    let getPostList = async () => {
      try {
        let listData = await getDocs(postcollections);
        const filterData = listData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPostList(filterData);
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
  }, []);

  if (typeof window !== "undefined" && !auth?.currentUser) router.push("/");
  return (
    <Layout>
      <div className="bg-white">
        <div className="0 mt-20 w-full md:flex lg:flex flex-wrap lg:pr-4 lg:pl-8 p-3 md:pt-6  gap-3 ">
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
