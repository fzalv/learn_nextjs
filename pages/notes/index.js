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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { getData } from "../api/hello";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ repo }) {
  console.log("data -> ", repo);
  const [notes, setNotes] = useState();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // const { data, isLoading } = useQueries({
  //   prefixUrl: "https://dummyjson.com/products/",
  // });

  // const { data, isLoading } = useSWR(
  //   "https://dummyjson.com/products/",
  //   fetcher,
  //   {
  //     revalidateOnFocus: true,
  //   }
  // );

  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch("https://dummyjson.com/products");
  //     const listNotes = await res.json();
  //     setNotes(listNotes);
  //   }
  //   fetchingData();
  // }, []);

  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((res) => res.json())
  //     .then((res) => console.log("response => ", res))
  //     .catch((err) => console.log("err => ", err));
  // }, []);

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
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={() => router.push("notes/add")}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {repo.products.map((item) => (
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
                        // onClick={() => handleDelete(item?.id)}
                        onClick={onOpen}
                        variant="solid"
                        colorScheme="red">
                        Delete
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}>
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Customer
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => handleDelete(item?.id)}
                                ml={3}>
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
      <p>tes</p>
    </>
  );
}
// export async function getStaticProps() {
//   const res = await fetch("https://dummyjson.com/products");
//   const note = await res.json();
//   return { props: { note }, revalidate: 10 };
// }

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch("../api/hello");
  const repo = await getData();
  // console.log(repo);
  // const repo = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}
