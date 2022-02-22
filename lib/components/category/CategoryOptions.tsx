import { Divider, Menu, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { IoTrash, IoPencil } from 'react-icons/io5'

interface CategoryOptionsProps {
  categoryId: string,
  categoryName: string,
}

const CategoryOptions = ({ categoryId, categoryName }: CategoryOptionsProps) => {
  const modal = useModals();

  const deleteSubmitHandler = () => {
    console.log("delete");
    console.log(categoryId);
  };

  const deleteClickHandler = () => {
    modal.openConfirmModal({
      title: "Delete this category",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this category named {categoryName}. This action
          is destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete category", cancel: "No don't delete it!"},
      confirmProps: { color: "red" },
      onCancel: () => { console.log("Cancel")},
      onConfirm: () => deleteSubmitHandler()
    })
  }

  const updateClickHandler = () => {

  }

  return (
    <>
      <Menu>
        <Menu.Label>Category Options</Menu.Label>
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
        >Delete</Menu.Item>
      </Menu>
    </>
  );
}

export default CategoryOptions