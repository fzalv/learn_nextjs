import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNotes({ notes }) {
  //console.log("isi notes => ", notes);
  return (
    <LayoutComponent metaTitle="Detail Products">
      <div>title: {notes.title}</div>
      <div>description: {notes.description}</div>
      <div>stock: {notes.stock}</div>
    </LayoutComponent>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products/");
  const notes = await res.json();

  const paths = notes.products.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
