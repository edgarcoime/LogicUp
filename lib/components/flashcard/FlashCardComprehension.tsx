import { ActionIcon } from "@mantine/core";
import { INote } from "lib/types/card.type";
import { IoAlert, IoCheckmarkDone } from "react-icons/io5";

interface FlashCardComprehensionProps {
  note: INote;
}

const FlashCardComprehension = ({ note }: FlashCardComprehensionProps) => {
  return note.fullyUnderstand 
    ? (
      <ActionIcon size="md" radius="xl" variant="light" color="green">
        <IoCheckmarkDone size={20} />
      </ActionIcon>
    )
    : (
      <ActionIcon size="md" radius="xl" variant="light" color="yellow">
        <IoAlert size={20} />
      </ActionIcon>
    );
}

export default FlashCardComprehension