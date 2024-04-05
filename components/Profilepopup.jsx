import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Profilepopup({ active, closefunc }) {
  const [imageBg, setImageBg] = useState(null);
  const [bgError, setBgError] = useState("");
  const [bgInput, setBgInput] = useState("");
  const [newBg, setNewBg] = useState(
    "https://images.pexels.com/photos/17867773/pexels-photo-17867773/free-photo-of-buck-and-deer-on-grassland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  let pfp =
    "https://images.pexels.com/photos/17867773/pexels-photo-17867773/free-photo-of-buck-and-deer-on-grassland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  useEffect(() => {
    bgChange();
  }, [imageBg]);

  let bgChange = (e) => {
    if (imageBg == null) return;
    const imageRef = ref(storage, `image/${imageBg.name + v4()}`);
    uploadBytes(imageRef, imageBg).then(() => {
      alert("image uploded");
      let bgUrl = URL.createObjectURL(imageBg);
      setNewBg(bgUrl);
    });
  };
  if (active == false) return null;

  return (
    <div className="overlay ">
      <div className="relative h-2/3 w-3/4 bg-white ">
        <div className=" h-6 w-6 absolute top-2 right-2 z-20 cursor-pointer  ">
          <IoCloseSharp
            className="text-2xl text-white z-10"
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
          value={bgInput}
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
        {bgError.length > 0 && <p>{bgError}</p>}
        <div className="h-1/2 w-full bg-gray-300 flex">
          <div className="w-1/2 bg-red-50 flex justify-center items-center">
            <img src={pfp} alt="" className="h-2/3 w-2/3 bg-cover" />
          </div>
          <div className="w-1/2 flex justify-center items-center">
            info
            <div>
              <input placeholder="your name" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
