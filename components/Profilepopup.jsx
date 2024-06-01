import React, { useState, useEffect, useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { storage, database, auth } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import userContext from "@/context/userContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Profilepopup({ active, closefunc }) {
  let { backgroundImg, setBackgroundImg, profile, setProfile, getUserData } =
    useContext(userContext);
  const userCollections = collection(database, "users");
  const [imageBg, setImageBg] = useState(null);
  const [imagePfp, setImagePfp] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pfp, setPfp] = useState(profile);
  const [newBg, setNewBg] = useState(backgroundImg);

  //animation
  //animations
  useEffect(() => {
    if (active) {
      gsap.fromTo(
        "#popupBox",
        { x: "100vw" },
        { x: 0, ease: "power2.inOut", duration: 1 }
      );
    }
  }, [active]);

  useEffect(() => {
    if (imagePfp != null) {
      let pfpUrl = URL.createObjectURL(imagePfp);
      console.log("pfp changed");
      setPfp(pfpUrl);
    }

    if (imageBg != null) {
      let bgUrl = URL.createObjectURL(imageBg);
      console.log("bg changed");
      setNewBg(bgUrl);
    }
  }, [imageBg, imagePfp]);

  let ImgChange = async () => {
    try {
      if (imagePfp != null) {
        const imageRef = ref(storage, `image/${imagePfp.name + v4()}`);
        await uploadBytes(imageRef, imagePfp);
        const url = await getDownloadURL(imageRef);

        const userlist = await getDocs(userCollections);
        for (const user of userlist.docs) {
          const userData = user.data();
          if (auth?.currentUser?.email === userData.email) {
            const userphoto = doc(database, "users", user.id);
            await updateDoc(userphoto, {
              userPfp: url,
            });
          }
        }
        alert("Profile image uploaded");
        setImagePfp(null);
      }

      if (imageBg != null) {
        const imageRef = ref(storage, `image/${imageBg.name + v4()}`);
        await uploadBytes(imageRef, imageBg);
        const url = await getDownloadURL(imageRef);

        const userlist = await getDocs(userCollections);
        for (const user of userlist.docs) {
          const userData = user.data();
          if (auth?.currentUser?.email === userData.email) {
            const userphoto = doc(database, "users", user.id);
            await updateDoc(userphoto, {
              userBg: url,
            });
          }
        }
        alert("Background image uploaded");
        setImageBg(null);
      }

      if (name.trim() !== "" || lastName.trim() !== "") {
        const newName = name + lastName;
        const userlist = await getDocs(userCollections);
        for (const user of userlist.docs) {
          const userData = user.data();
          if (auth?.currentUser?.email === userData.email) {
            const userphoto = doc(database, "users", user.id);
            await updateDoc(userphoto, {
              username: newName,
            });
          }
        }
        setName(" ");
        setLastName(" ");
        alert("Username updated");
        getUserData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (active == false) return null;

  return (
    <div className="overlay ">
      <div
        id="popupBox"
        className="translate-x-[100vw] relative md:h-2/3 h-[550px] w-5/6 md:w-2/3 bg-white "
      >
        <div className=" h-6 w-6 absolute top-2 right-2 z-20 cursor-pointer  ">
          <IoCloseSharp
            className="text-2xl text-white z-10 border-2 bg-black"
            onClick={() => {
              closefunc();
              setLastName(" ");
              setName(" ");
            }}
          />
        </div>
        <input
          id="bgPic"
          type="file"
          className="bg-red hidden h-12 w-full"
          onChange={(e) => {
            setImageBg(e.target.files[0]);
          }}
        />
        <div
          style={{ backgroundImage: `url(${newBg})` }}
          className="h-1/3 md:h-1/2 w-full overflow-hidden relative bg-cover bg-center bg-red-400"
        >
          <label htmlFor="bgPic">
            <div className="h-[50px]  shadow-sm shadow-white transition duration-300 hover:scale-105 hover: w-[165px] flex justify-center items-center  bg-black bg-opacity-40 text-white   translate(-50%, -50%) -translate-x-1/2 -translate-y-1/2  rounded-full  absolute top-1/2 left-1/2  ">
              <p>Upload Image</p>
            </div>
          </label>
        </div>
        <div className="h-2/3 md:h-1/2 w-full bg-gray-300 md:flex">
          <div className="w-full md:w-1/2 h-1/3 md:h-full  bg-red-50 flex justify-center items-center p-2">
            <input
              id="pfp"
              type="file"
              className="bg-red hidden h-full w-full"
              onChange={(e) => {
                setImagePfp(e.target.files[0]);
              }}
            />
            <div
              style={{ backgroundImage: `url(${pfp})` }}
              className="h-full w-full overflow-hidden relative bg-cover bg-center bg-red-400"
            >
              <label htmlFor="pfp">
                <div className="h-[50px]  shadow-sm shadow-white transition duration-300 hover:scale-105 hover: w-[165px] flex justify-center items-center  bg-black bg-opacity-40 text-white   translate(-50%, -50%) -translate-x-1/2 -translate-y-1/2  rounded-full  absolute top-1/2 left-1/2  ">
                  <p>Upload Image</p>
                </div>
              </label>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:h-full h-2/3  flex flex-col justify-between  p-4 bg-gray-50">
            <h1 className="md:text-2xl text-lg text-gray-500 text-center text">
              This will be your new username
            </h1>
            <div className="flex w-full p-3 items-center">
              <label htmlFor="name" className="w-auto text-sm">
                Name:
              </label>
              <input
                placeholder="your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="bg-white h-8 p-2 w-auto shadow-sm ml-3 flex-1"
              />
            </div>
            <div className="flex w-full p-3 items-center ">
              <label htmlFor="last name" className="text-sm">
                Last Name:
              </label>
              <input
                placeholder="your Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                className="bg-white h-8 p-2 w-auto shadow-sm ml-3 flex-1"
              />
            </div>
            <button
              onClick={ImgChange}
              className="bg-blue-500 text-white self-end w-40 h-10 rounded-md "
            >
              save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
