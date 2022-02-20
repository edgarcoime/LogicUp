import { Button, Center, Container, Group, Modal, Textarea } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "lib/firebase/init";
import { useState } from "react";
import { useUser } from "reactfire";
import {v4 as uuid} from "uuid";

interface FlashCardInputProps {
  categoryId: string
}

async function getKeywords<Str extends string>(anAnswer: Str): Promise<string[]> {
  const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({answer: anAnswer}),
  });
  const data = await response.json();
  const result = data.result[0]["text"]
  console.log(result)
  console.log(tokenizeKeywords(result));
  return tokenizeKeywords(result);
}

function tokenizeKeywords(unformatted: string) {
  const keywords = unformatted.slice(2)
  return keywords.split(",")
}

const FlashCardInput = ({ categoryId }: FlashCardInputProps) => {
  const [ opened, setOpened ] = useState(false)
  const [submitState, setSubmitState] = useState({
    saving: false,
    buttonText: "Submit"
  })

  const user = useUser();

  const form = useForm(
    {
      initialValues: {
        prompt: '',
        answer: ''
      }
    }
  );

  const onSubmitHandler = async (values: {prompt: string, answer: string}) => {

    try {
      // Setup submission
      setSubmitState(prev => ({
        ...prev,
        saving: true,
        buttonText: "Saving Document..."
      }));

      let keywords = await getKeywords(values.answer)

      const userId = user.data?.uid;
      if (!userId) throw new Error("No UserId found");

      const categoryRef = doc(db, "categories", categoryId);
      const docSaveRes = await updateDoc(categoryRef, {
        notes: arrayUnion(
          {
            prompt: values.prompt,
            answer: values.answer,
            keywords: keywords,
          }
        )
      })

    } catch (error) {
      console.log(error);
    } finally {
      // Cleanup Submission
      setSubmitState(prev => ({
        ...prev,
        saving: false,
        buttonText: "Submit"
      }))
      setOpened(false);
    }
  }

  return (
    <>
      {/* MODAL */}
      <Modal
        size="lg"
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
      >
        <Container
            size="xl"
            style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <h1>✨Create a Cue Card</h1>
            <Container style={{width: "100%"}}>

            <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
                <Textarea
                    {...form.getInputProps('prompt')}
                    label="Prompt"
                    placeholder="Your cue card prompt"
                    required
                    minRows={3}
                />
                <Textarea 
                    {...form.getInputProps('answer')}                        
                    label="Answer"
                    placeholder="Your cue card answer"
                    required

                    minRows={5}
                />
                <Center
                    style={{ padding: 15 }}
                >
                    <Button 
                        type="submit"
                        variant="gradient"
                        size="md"
                        gradient={{ from: 'indigo', to: 'cyan', deg: 135 }}
                    >
                        Add Cue Card
                    </Button>
                </Center>
            </form>
            </Container>

        </Container>
      </Modal>

      {/* Content */}
      <Group grow>
        <Button onClick={() => setOpened(true)}>
          Add new Card
        </Button>
      </Group>
    </>
  );
}

export default FlashCardInput