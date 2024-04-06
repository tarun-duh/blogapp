import React, { useState, useEffect } from "react";
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

export default function Profilepopup({ active, closefunc }) {
  const userCollections = collection(database, "users");
  const [imageBg, setImageBg] = useState(null);
  const [imagePfp, setImagePfp] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pfp, setPfp] = useState(
    "https://images.pexels.com/photos/17867773/pexels-photo-17867773/free-photo-of-buck-and-deer-on-grassland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [newBg, setNewBg] = useState(
    "https://images.pexels.com/photos/17867773/pexels-photo-17867773/free-photo-of-buck-and-deer-on-grassland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  useEffect(() => {
    let ImgChange = async (e) => {
      if (imageBg == null && imagePfp == null) return;
      try {
        if (imagePfp != null) {
          const imageRef = ref(storage, `image/${imagePfp.name + v4()}`);
          uploadBytes(imageRef, imagePfp).then(() => {
            getDownloadURL(imageRef).then(async (url) => {
              try {
                let userlist = await getDocs(userCollections);
                let filterusers = userlist.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                }));
                let userId;
                let userEmail;
                console.log(userEmail, "first");
                filterusers.map(async (user) => {
                  userId = user.id;
                  userEmail = user.email;
                  if (auth?.currentUser?.email == userEmail) {
                    console.log(userEmail, "second");
                    const userphoto = doc(database, "users", userId);
                    await updateDoc(userphoto, {
                      userPfp: url,
                    });
                  }
                });
              } catch (err) {
                console.log(err);
              }
            });
            alert("profile image uploded");
          });
          let pfpUrl = URL.createObjectURL(imagePfp);
          console.log("pfp changed");
          setPfp(pfpUrl);
          setImagePfp(null);
        }

        if (imageBg != null) {
          const imageRef = ref(storage, `image/${imageBg.name + v4()}`);
          uploadBytes(imageRef, imageBg).then(() => {
            getDownloadURL(imageRef).then(async (url) => {
              try {
                let userlist = await getDocs(userCollections);
                let filterusers = userlist.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                }));
                let userId;
                let userEmail;
                console.log(userEmail, "first");
                filterusers.map(async (user) => {
                  userId = user.id;
                  userEmail = user.email;
                  if (auth?.currentUser?.email == userEmail) {
                    console.log(userEmail, "second");
                    const userphoto = doc(database, "users", userId);
                    await updateDoc(userphoto, {
                      userBg: url,
                    });
                  }
                });
              } catch (err) {
                console.log(err);
              }
            });
            alert("background image uploded");
          });
          let bgUrl = URL.createObjectURL(imageBg);
          console.log("bg changed");

          setNewBg(bgUrl);
          setImageBg(null);
        }
      } catch (err) {
        console.log(err);
      }
      /// updating userpfp and userbg in firebase in user collection

      let userlist = await getDocs(userCollections);
      let filterusers = userlist.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let userId;
      let userEmail;
      console.log(userEmail, "first");
      filterusers.map(async (user) => {
        userId = user.id;
        userEmail = user.email;
        if (auth?.currentUser?.email == userEmail) {
          console.log(userEmail, "second");
          const userphoto = doc(database, "users", userId);
          await updateDoc(userphoto, {
            // userPfp: `${imagePfp.name + v4()}`,
            // userBg: `${imageBg.name + v4()}`,
          });
        }
      });
      console.log(userEmail, "third");
      // if (auth?.currentUser?.email == userEmail) {
      //   console.log("eamil to macth h pr age nhi kuch krenge");
      //   const userphoto = doc(database, "users", userId);
      //   await updateDoc(userphoto, {
      //     userPfp: `image/${imagePfp.name + v4()}`,
      //     userBg: `image/${imageBg.name + v4()}`,
      //   });
      // }
    };

    ImgChange();
  }, [imageBg, imagePfp]);

  if (active == false) return null;

  return (
    <div className="overlay ">
      <div className="relative h-2/3 w-3/4 bg-white ">
        <div className=" h-6 w-6 absolute top-2 right-2 z-20 cursor-pointer  ">
          <IoCloseSharp
            className="text-2xl text-white z-10 border-2 bg-black"
            onClick={closefunc}
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
          className="h-1/2 w-full overflow-hidden relative bg-cover bg-center bg-red-400"
        >
          <label htmlFor="bgPic">
            <div className="h-[50px]  shadow-sm shadow-white transition duration-300 hover:scale-105 hover: w-[165px] flex justify-center items-center  bg-black bg-opacity-40 text-white   translate(-50%, -50%) -translate-x-1/2 -translate-y-1/2  rounded-full  absolute top-1/2 left-1/2  ">
              <p>Upload Image</p>
            </div>
          </label>
        </div>
        <div className="h-1/2 w-full bg-gray-300 flex">
          <div className="w-1/2 bg-red-50 flex justify-center items-center p-2">
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
          <div className="w-1/2 h-full flex flex-col   p-4 bg-gray-50">
            <div className="flex w-full p-3 items-center">
              <label htmlFor="name" className="w-auto">
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
              <label htmlFor="last name" className="">
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
          </div>
        </div>
      </div>
    </div>
  );
}
