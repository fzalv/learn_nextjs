import dynamic from "next/dynamic";
// import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  // console.log("notes data => ", notes);
  const [notes, setNotes] = useState({ title: "", description: "" });
  const router = useRouter();
  const { mutate } = useMutation();

  const handlesubmit = async () => {
    // try {
    //   const response = await fetch("https://dummyjson.com/products/add", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(notes),
    //   });
    //   const result = await response.json();
    //   if (result?.success) {
    //     router.push("/notes");
    //   }
    // } catch (error) {}

    const response = await mutate({
      url: "https://dummyjson.com/products/add",
      headers: {
        "Content-Type": "application/json",
      },
      payload: notes,
    });

    console.log("response => ", response);
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
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
      </LayoutComponent>
    </>
  );
}
