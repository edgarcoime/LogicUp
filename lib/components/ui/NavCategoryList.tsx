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
import CategoryOptions from "../category/CategoryOptions";

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
              <CategoryOptions categoryId={cat.id} categoryName={cat.name} />
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
