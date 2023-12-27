import dynamic from "next/dynamic";
// import Link from "next/link";

import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  // console.log("notes data => ", notes);
  const [notes, setNotes] = useState();
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });
      const result = await response.json();

      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://dummyjson.com/products");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  // console.log("notes => ", notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {/* {notes.products.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))} */}

        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={() => router.push("notes/add")}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {notes?.products?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item.description}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => router.push(`/notes/edit/${item?.id}`)}
                        variant="solid"
                        colorScheme="blue">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item?.id)}
                        variant="solid"
                        colorScheme="red">
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}
// export async function getStaticProps() {
//   const res = await fetch("https://dummyjson.com/products");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
