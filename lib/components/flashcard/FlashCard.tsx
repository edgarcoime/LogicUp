import { ActionIcon, Button, Card, Container, Group, Modal, Space, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { checkOptions } from "reactfire";
import ReactCardFlip from 'react-card-flip'
import { INote } from "lib/types/card.type";
import { IoKeypad, IoMicOutline, IoRefresh, IoCheckmarkDone, IoAlert } from 'react-icons/io5';
import { useInputState } from "@mantine/hooks";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "lib/firebase/init";
import { getMatchPercentage } from "lib/functions/comparePrompts";

interface FlashCardProps {
  note: INote
  categoryId: string
}

const FlashCard = ({
  note,
  categoryId
}: FlashCardProps) => {
  const [promptAnswer, setPromptAnswer] = useInputState('');

  const [flip, setFlip] = useState(false);
  const [opened, setOpened] = useState(false);
  const [submitState, setSubmitState] = useState({
    saving: false,
    buttonText: "Submit"
  })

  const handleAudio = async () => {
    console.log("Handle Audio");
  }

  const submitHandler = async () => {
    try {
      // Setup submission
      setSubmitState(prev => ({
        ...prev,
        saving: true,
        buttonText: "Checking answer..."
      }));

      // Query and compare
      let promptResult = getMatchPercentage(note.keywords, promptAnswer);
      if (!!note.fullyUnderstand) {
        promptResult = true;
      }

      const docRef = doc(db, "categories", categoryId)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let docData = docSnap.data();
        let categoryNotes = docData.notes;

        // Find the index of edited card
        const foundIdx = categoryNotes.findIndex((element: INote) => element.id === note.id);

        const payload = [...categoryNotes ]
        payload[foundIdx].fullyUnderstand = promptResult;

        const docUpdateRes = await updateDoc(docRef, {
          notes: payload
        });
      } else {
        throw new Error("Error occured. Could not find category.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Cleanup submission
      setPromptAnswer("");
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
      {/* MODAL FOR INPUT */}
      <Modal
        title="What is your answer for this question?"
        size="lg"
        opened={opened}
        hideCloseButton={submitState.saving}
        onClose={() => setOpened(false)}
      >
        <Textarea
          label="Answer"
          placeholder="Type your answer here!"
          required
          minRows={5}
          value={promptAnswer}
          onChange={setPromptAnswer}
        />
        <Space h="md" />
        <Button
          onClick={() => submitHandler()}
          fullWidth
          disabled={submitState.saving}
        >
          {submitState.buttonText}
        </Button>
      </Modal>

      {/* CONTENT */}
      <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <Card
          shadow="md"
          padding="xl"
        >
          <Group position="right">
            {note.fullyUnderstand ? (
              <ActionIcon size="md" radius="xl" variant="light" color="green">
                <IoCheckmarkDone size={20} />
              </ActionIcon>
            ) : (
              <ActionIcon size="md" radius="xl" variant="light" color="yellow">
                <IoAlert size={20} />
              </ActionIcon>
            )}
          </Group>
          <Text size="md">{note.prompt}</Text>
          <Space h="lg" />
          <Group position="apart">
            <ActionIcon size="xl" radius="lg" onClick={() => handleAudio()}>
              <IoMicOutline size={30} />
            </ActionIcon>
            <ActionIcon size="xl" radius="lg" onClick={() => setOpened(true)}>
              <IoKeypad size={30} />
            </ActionIcon>
            <ActionIcon size="xl" radius="lg" onClick={() => setFlip(prev => !prev)}>
              <IoRefresh size={30} />
            </ActionIcon>
          </Group>
        </Card>

        <Card
          shadow="md"
          padding="xl"
        >
          <Group position="right">
            {note.fullyUnderstand ? (
              <ActionIcon size="md" radius="xl" variant="light" color="green">
                <IoCheckmarkDone size={20} />
              </ActionIcon>
            ) : (
              <ActionIcon size="md" radius="xl" variant="light" color="yellow">
                <IoAlert size={20} />
              </ActionIcon>
            )}
          </Group>
          <Text size="md">{note.answer}</Text>
          <Space h="lg" />
          <Group position="right">
            <ActionIcon size="xl" radius="lg" onClick={() => setFlip(prev => !prev)}>
              <IoRefresh size={30} />
            </ActionIcon>
          </Group>
        </Card>
      </ReactCardFlip>
    </>
  )
}

export default FlashCard