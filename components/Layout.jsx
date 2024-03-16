import React from "react";
import Header from "./Header";

export default function Layout({ children, login, signup, publish, logOut }) {
  return (
    <>
      <Header login={login} signup={signup} publish={publish} logOut={logOut} />
      <main>{children}</main>
    </>
  );
}
