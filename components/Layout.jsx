import React from "react";
import Header from "./Header";

export default function Layout({
  children,
  login,
  signup,
  publish,
  logOut,
  handleSearch,
  searchQuery,
}) {
  return (
    <>
      <Header
        searchQuery={searchQuery}
        login={login}
        signup={signup}
        publish={publish}
        logOut={logOut}
        handleSearch={handleSearch}
      />
      <main>{children}</main>
    </>
  );
}
