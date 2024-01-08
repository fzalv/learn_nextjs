// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // const response = await fetch("https://dummyjson.com/products/");
  const jsonData = await response.json();
  res.status(200).json(jsonData);
}

export async function getData() {
  const response = await fetch("https://dummyjson.com/products/");
  const jsonData = await response.json();
  return jsonData;
}

// export async function getServerSideProps() {
//   const response = await fetch("https://dummyjson.com/products/");
//   const repo = await response.json();

//   return { repo };
// }
