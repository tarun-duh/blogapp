import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, database } from "../firebase/firebaseConfig";
import BlogPosts from "@/components/BlogPosts";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import Layout from "@/components/Layout";

export default function blog() {
  const [postList, setPostList] = useState([]);
  const postcollections = collection(database, "post");
  const userCollections = collection(database, "users");
  const [profile, setProfile] = useState(
    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    /// updating user profile in the posts
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
            let listData = await getDocs(postcollections);
            const filterData = listData.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            for (let j of filterData) {
              if (j.useremail == auth?.currentUser?.email) {
                const userphoto = doc(database, "post", j.id);
                await updateDoc(userphoto, {
                  profile: i.userPfp,
                  author: i.username,
                });
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    let getPostList = async () => {
      try {
        let listData = await getDocs(postcollections);
        const filterData = listData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        filterData.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(filterData);
        setPostList(filterData);
        setFilteredPosts(filterData);
        let usersdata = await getDocs(userCollections);
        const filterUsers = usersdata.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      } catch (err) {
        console.error("Error getting documents: ", err);
      }
    };
    getUserDate();
    getPostList();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    // Filter posts based on search query and user email
    const filtered = postList.filter((post) =>
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (typeof window !== "undefined" && !auth?.currentUser) router.push("/");
  return (
    <>
      <Layout handleSearch={handleSearch} searchQuery={searchQuery}>
        <div className="bg-white">
          <div className="0 mt-20 w-full md:flex lg:flex flex-wrap lg:pr-4 lg:pl-8 p-3 md:pt-6  gap-3 pb-6">
            {filteredPosts.map((post, index) => (
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
    </>
  );
}
