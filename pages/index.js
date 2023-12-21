import Layout from "@/layout";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const layoutComponent = dynamic(() => import("@/layout"));

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.log("err => ", err));
  }, []);

  return (
    <>
      <Layout metaTitle="Home">
        <p>Home</p>
      </Layout>
    </>
  );
}
