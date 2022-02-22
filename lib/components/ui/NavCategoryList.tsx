import { useUserCategories } from "../hooks/categoryHooks";
import {
  ActionIcon,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { IUser } from "lib/types/user.type";
import Link from "next/link";
import { useUser } from "reactfire";
import { IoClose } from "react-icons/io5";
import { useModals } from "@mantine/modals";

interface NavCategoryListProps {}

const NavCategoryList = ({}: NavCategoryListProps) => {
  const user = useUser();
  const { data } = useUserCategories();

  return (
    <>
      <Text 
        size="xl" 
        align="center" 
        m="lg"
      >
        Categories
      </Text>

      {!!user.data && <CategoryList user={data as IUser} />}
    </>
  );
};

interface CategoryListInterface {
  user: IUser;
}

const CategoryList = ({ user }: CategoryListInterface) => {
  const modal = useModals();
  const deleteHandler = (id: string) => {
    console.log("delete");
    console.log(id);
  };

  const openDeleteModal = (categoryName: string, categoryId: string) => {
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
      onConfirm: () => deleteHandler(categoryId)
    })
  }

  return !!user ? (
    <>
      {user.categories.map((cat) => {
        return (
          <div key={cat.id}>
            <Group position="apart">
              <Link href={`/category/${cat.id}`} passHref>
                <Container
                  size="md"
                  my="xs"
                >
                  <Text size="lg">{cat.name}</Text>
                </Container>
              </Link>
              <ActionIcon
                size="md"
                radius="xl"
                variant="light"
                color="red"
                onClick={() => openDeleteModal(cat.name, cat.id)}
              >
                <IoClose size={20} />
              </ActionIcon>
            </Group>
          </div>
        );
      })}
    </>
  ) : (
    <></>
  );
};

export default NavCategoryList;
