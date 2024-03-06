import React from "react";
import blogyou from "../public/images/newlogo.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

export default function write() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen">
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
          </div>
          <div className="flex ">
            <nav className=" flex  items-center text-base mr-8 justify-center text-black hover:text-gray-500"></nav>
            <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  ">
              <FaUserCircle className="text-3xl text-orange-500" />
            </button>
          </div>
        </div>
      </header>
      <div className="w-full bg-red-400 h-4/5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat optio
        pariatur maxime fuga accusantium autem quae vel voluptatem temporibus
        est, aspernatur voluptatum dolorem.
      </div>
    </div>
  );
}
