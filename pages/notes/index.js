import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  console.log("notes data => ", notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {notes.products.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
