import dynamic from "next/dynamic";
// import Link from "next/link";
import { useEffect, useState } from "react";
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
const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  // console.log("notes data => ", notes);
  const [notes, setNotes] = useState();
  const router = useRouter();
  const { id } = router?.query;

  const handlesubmit = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: notes?.title,
          description: notes?.description,
        }),
      });
      const result = await response.json();

      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const listNotes = await res.json();
      // console.log("list notes => ", listNotes);
      setNotes(listNotes);
    }
    fetchingData();
  }, [id]);
  // console.log("data => ", id);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
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
      </LayoutComponent>
    </>
  );
}
