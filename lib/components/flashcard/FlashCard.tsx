import { ActionIcon, Button, Card, Container, Group, Space, Text } from "@mantine/core";
import { useState } from "react";
import { checkOptions } from "reactfire";
import ReactCardFlip from 'react-card-flip'
import { INote } from "lib/types/card.type";
import { IoKeypad, IoMicOutline, IoRefresh } from 'react-icons/io5';

interface FlashCardProps {
  note: INote
  categoryId: string
}

const FlashCard = ({
  note
}: FlashCardProps) => {
  const [flip, setFlip] = useState(false);

  const handleAudio = async () => {
    console.log("Handle Audio");
  }

  const handleKeypad = () => {
    console.log("Handle Keypad");
  }

  return (
    <>
      <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <Card
          shadow="sm"
          padding="xl"
        >
          <Text size="md">{note.prompt}</Text>
          <Space h="lg" />
          <Group position="apart">
            <ActionIcon size="xl" radius="lg" onClick={() => handleAudio()}>
              <IoMicOutline size={30} />
            </ActionIcon>
            <ActionIcon size="xl" radius="lg" onClick={() => handleKeypad()}>
              <IoKeypad size={30} />
            </ActionIcon>
            <ActionIcon size="xl" radius="lg" onClick={() => setFlip(prev => !prev)}>
              <IoRefresh size={30} />
            </ActionIcon>
          </Group>
        </Card>

        <Card
          shadow="sm"
          padding="xl"
        >
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