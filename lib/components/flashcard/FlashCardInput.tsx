import { Button, Center, Container, Group, Modal, Textarea } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";

interface FlashCardInputProps {
  
}

async function getKeywords<Str extends string>(anAnswer: Str) {
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
}

function tokenizeKeywords(unformatted: string) {
  const keywords = unformatted.slice(2)
  return keywords.split(",")
}

const FlashCardInput = ({}: FlashCardInputProps) => {
  const [ opened, setOpened ] = useState(false)

  const form = useForm(
    {
      initialValues: {
        prompt: '',
        answer: ''
      }
    }
  );

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

            <form onSubmit={form.onSubmit((values) => getKeywords(values.answer))}>
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