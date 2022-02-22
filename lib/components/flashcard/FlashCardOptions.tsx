import { Divider, Menu, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useNotifications } from "@mantine/notifications";
import { INote } from "lib/types/card.type";
import { IoTrash, IoPencil } from 'react-icons/io5'

interface CategoryOptionsProps {
  categoryId: string,
  note: INote,
}

const FlashCardOptions = ({ categoryId, note }: CategoryOptionsProps) => {
  const modal = useModals();
  const notifications = useNotifications();

  const deleteSubmitHandler = () => {
    console.log("delete");
    console.log(categoryId);
    console.log(note);
  };

  const deleteClickHandler = () => {
    modal.openConfirmModal({
      title: "Delete this note",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this note? This action
          is destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete note", cancel: "No don't delete it!"},
      confirmProps: { color: "red" },
      onCancel: () => { console.log("Cancel")},
      onConfirm: () => deleteSubmitHandler(),
    })
  }

  const updateSubmitHandler = () => {

  }

  const updateClickHandler = () => {
    console.log("Updating note");
    console.log(note);
  }

  return (
    <>
      <Menu>
        <Menu.Label>Flash Card Options</Menu.Label>
        <Menu.Item 
          icon={<IoPencil />}
          onClick={() => updateClickHandler()}
        >
          Edit
        </Menu.Item>

        <Divider />

        <Menu.Label>Danger Zone</Menu.Label>
        <Menu.Item 
          color="red" 
          icon={<IoTrash />}
          onClick={() => deleteClickHandler()}
        >
          Delete
        </Menu.Item>
      </Menu>
    </>
  );
}

export default FlashCardOptions