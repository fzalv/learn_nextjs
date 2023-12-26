import Layout from "@/layout";
import Image from "next/image";
import dynamic from "next/dynamic";
// import { useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Main() {
  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((res) => res.json())
  //     .then((res) => console.log("response => ", res))
  //     .catch((err) => console.log("err => ", err));
  // }, []);

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <p>Home</p>
        {/* <Image src="/next.png" width={400} height={400} alt="next image" />

        <img
          src="/next.png"
          style={{ width: 400, height: 400 }}
          alt="next image"
        /> */}
      </LayoutComponent>
    </>
  );
}
