import Layout from "@/layout";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Content from "@/components/content";

export default function profile() {
  return (
    <>
      <Layout
        metaTitle="Profile"
        metaDesc="Semua informasi ini adalah seputar profile user">
        <p>Profile</p>
      </Layout>
      {/* <Header />
      <p>Profiles</p>
      <Footer /> */}
    </>
  );
}
