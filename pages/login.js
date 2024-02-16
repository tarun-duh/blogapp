import { useRouter } from "next/router";
import React from "react";

export default function login() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      this is login page
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        click me{" "}
      </button>
    </div>
  );
}
