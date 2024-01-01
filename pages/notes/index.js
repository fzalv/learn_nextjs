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
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import fetcher from "@/utils/fetcher";
import useSWR from "swr";


import { useQueries } from "@/hooks/useQueries";

const LayoutComponent = dynamic(() => import("@/layout"));
const { data, error, isLoading } = useSWR(
  "https://dummyjson.com/products/",
  fetcher,
  { revalidateOnFocus: true }
);

export default function Notes() {
  // console.log("notes data => ", notes);
  const [notes, setNotes] = useState();
  const router = useRouter();

  const { data, isLoading } = useQueries({
    prefixUrl: "https://dummyjson.com/products/",
  });

  // console.log("data => ", data);

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://dummyjson.com/products");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

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
          {isLoading ? (
            <Flex alignItems="center" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <Flex>
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {data?.products?.map((item) => (
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
          )}
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
