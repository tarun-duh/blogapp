import React, { useState } from "react";
import blogyou from "../public/images/newlogo.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebaseConfig";
import Link from "next/link";

export default function Header({
  login,
  signup,
  publish,
  logOut,
  handleSearch,
  searchQuery,
}) {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div>
      <header className="z-20 fixed top-0 bg-white w-full shadow-sm shadow-slate-200  ">
        <div className=" w-full  flex  md:p-5 lg:p-5 px-3  py-5  items-center justify-between ">
          <div className="flex justify-center items-center">
            <Link
              href={currentPage === "/" ? "/" : "/blog"}
              className="cursor-pointer   flex title-font font-medium items-center  justify-center text-gray-900  "
            >
              <Image
                className="w-30 md:w-48 hidden md:block lg:block"
                priority={true}
                src={blogyou}
                alt="My Image"
                width={180}
                height={"auto"}
              />
              {(currentPage === "/write" || currentPage === "/profile") && (
                <Image
                  onClick={() => {
                    router.push("/blog");
                  }}
                  className="w-30 md:w-48  md:hidden lg:hidden"
                  priority={true}
                  src={blogyou}
                  alt="My Image"
                  width={165}
                  height={"auto"}
                />
              )}
              {currentPage === "/" && (
                <Image
                  onClick={() => {
                    router.push("/");
                  }}
                  className="w-30 md:w-48  md:hidden lg:hidden"
                  priority={true}
                  src={blogyou}
                  alt="My Image"
                  width={180}
                  height={"auto"}
                />
              )}
            </Link>
            {currentPage === "/blog" && (
              <input
                value={searchQuery}
                type="text"
                placeholder="search"
                onChange={handleSearch}
                className="h-auto w-auto bg-gray-100 lg:ml-6 md:ml-6  rounded-full px-3 py-2 text-sm focus:outline-none"
              />
            )}
          </div>
          <div className="flex ">
            {(currentPage === "/profile" || currentPage === "/blog") && (
              <nav className=" flex  items-center text-base mr-3 md:mr-6 justify-center text-black hover:text-gray-500">
                <a
                  onClick={() => {
                    router.push("/write");
                  }}
                  className="cursor-pointer flex items-center justify-center "
                >
                  <FaRegEdit className="text-l  " />
                  <p className=" text-l ml-2 text-sm md:text-base ">Write</p>
                </a>
              </nav>
            )}
            {currentPage === "/blog" && (
              <button className=" items-center  md:inline-flex  border-0 py-1 px-1 md:px-3 focus:outline-none hover:bg-gray-200 rounded text-base  ">
                <FaUserCircle
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="text-3xl text-orange-500 "
                />
              </button>
            )}
            {currentPage === "/" && (
              <div className="md:hidden p-1 h-9 flex items-center justify-center">
                <FaUserCircle
                  onClick={login}
                  className="text-orange-400 text-3xl "
                />
              </div>
            )}
            <div className="md:flex ">
              {currentPage === "/" && (
                <div className="md:flex hidden items-center space-x-4 text-base font-medium tracking-tight">
                  <button
                    onClick={login}
                    // style={{
                    //   backgroundColor: "#4A732D",
                    // }}
                    className="px-5 py-2  text-black   bg-white border border-white rounded-full hover:border-black hover:border hover:text-gray-450  "
                  >
                    Sign in
                  </button>
                  <button
                    onClick={signup}
                    className="px-6 py-2 shadow-2xl shadow-slate-400 text-white transition duration-600 ease-out bg-purple-800 rounded-full hover:bg-green-900 hover:ease-in "
                  >
                    Get started
                  </button>
                </div>
              )}
              {currentPage === "/write" && (
                <div className="flex ">
                  <nav className=" flex  items-center text-base mr-8 justify-center text-black hover:text-gray-500"></nav>
                  <button
                    onClick={publish}
                    className="px-6 py-2 mr-3 shadow-2xl shadow-slate-400 text-white text-xs transition duration-600 ease-out bg-lime-600 rounded-full hover:bg-green-800 hover:ease-in "
                  >
                    Publish
                  </button>
                  <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  ">
                    <FaUserCircle
                      onClick={() => {
                        router.push("profile");
                      }}
                      className="text-3xl text-orange-500"
                    />
                  </button>
                </div>
              )}
              {currentPage === "/profile" && (
                <button
                  onClick={logOut}
                  className="bg-blue-500 hover:bg-blue-600 text-white md:font-semibold p-1.5 md:py-2 md:px-4 text-xs md:text-xs rounded"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
