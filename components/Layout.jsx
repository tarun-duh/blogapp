import React from "react";
import Header from "./Header";

export default function Layout({ children, login, signup, publish }) {
  return (
    <>
      <Header login={login} signup={signup} publish={publish} />
      <main>{children}</main>
    </>
  );
}
