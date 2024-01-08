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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
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
  const {
    isOpen,
    onOpen,
    onClose,
    isOpen2,
    onOpen2,
    onClose2,
    isOpen3,
    onOpen3,
    onClose3,
  } = useDisclosure();
  const cancelRef = React.useRef();

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

  const handlesubmit = async () => {
    const response = await mutate({
      url: "https://dummyjson.com/products/add",
      headers: {
        "Content-Type": "application/json",
      },
      payload: notes,
    });

    console.log("response => ", response);
  };

  // console.log("notes => ", notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            {/* <Button colorScheme="blue" onClick={() => router.push("notes/add")}>
              Add Notes
            </Button> */}
            <Button colorScheme="blue" onClick={onOpen}>
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
                      {/* <Button
                        onClick={() => router.push(`/notes/edit/${item?.id}`)}
                        variant="solid"
                        colorScheme="blue">
                        Edit
                      </Button> */}
                      <Button
                        onClick={onOpen2}
                        variant="solid"
                        colorScheme="blue">
                        Edit
                      </Button>
                      <Button
                        // onClick={() => handleDelete(item?.id)}
                        onClick={onOpen3}
                        variant="solid"
                        colorScheme="red">
                        Delete
                      </Button>
                      <AlertDialog
                        isOpen={isOpen3}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose3}>
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
                              <Button ref={cancelRef} onClick={onClose3}>
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

        {/* MODAL ADD */}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Card margin="5" padding="5">
                <Heading>Add Notes</Heading>
                <Grid gap="5">
                  <GridItem>
                    <Text>Title</Text>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setNotes({ ...notes, title: event.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem>
                    <Text>Description</Text>
                    <Textarea
                      onChange={(event) =>
                        setNotes({ ...notes, description: event.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem>
                    <Button colorScheme="blue" onClick={() => handlesubmit()}>
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </Card>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* MODAL EDIT */}
        <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Card margin="5" padding="5">
                <Heading>Edit Notes</Heading>
                <Grid gap="5">
                  <GridItem>
                    <Text>Title</Text>
                    <Input
                      type="text"
                      value={notes?.title || ""}
                      onChange={(event) =>
                        setNotes({ ...notes, title: event.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem>
                    <Text>Description</Text>
                    <Textarea
                      value={notes?.description || ""}
                      onChange={(event) =>
                        setNotes({ ...notes, description: event.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem>
                    <Button colorScheme="blue" onClick={() => handlesubmit()}>
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </Card>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose2}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </LayoutComponent>
      {/* <p>tes</p> */}
    </>
  );
}
export async function getServerSideProps() {
  const repo = await getData();
  return { props: { repo } };
}
