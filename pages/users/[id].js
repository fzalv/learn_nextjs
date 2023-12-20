import Layout from "@/layout";
import { useRouter } from "next/router";

export default function UsersbyName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout>
      <p>Users by Name {id}</p>
    </Layout>
  );
}
