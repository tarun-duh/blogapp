import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import userContext from "./userContext";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { database } from "@/firebase/firebaseConfig";

const ContextProvider = ({ children }) => {
  const userCollections = collection(database, "users");
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.pexels.com/photos/17096705/pexels-photo-17096705/free-photo-of-sereno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [profile, setProfile] = useState(
    "https://images.pexels.com/photos/7755619/pexels-photo-7755619.jpeg?auto=compress&cs=tinysrgb&w=600"
  );
  const [name, setName] = useState("Anonymous");
  let getUserData = async () => {
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
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <userContext.Provider
      value={{
        backgroundImg,
        setBackgroundImg,
        profile,
        setProfile,
        name,
        setName,
        getUserData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
