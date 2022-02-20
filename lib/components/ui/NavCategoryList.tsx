import { useUserCategories } from "../hooks/categoryHooks";
import { Container, Text } from '@mantine/core'
import { IUser } from "lib/types/user.type";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavCategoryListProps {
  
}

const NavCategoryList = ({}: NavCategoryListProps) => {
  const { data, status } = useUserCategories();

  return (
    <>
      <Text size="lg" align="center">
        Categories
      </Text>

      <CategoryList user={(data as IUser)}/>
    </>
  );
}


interface CategoryListInterface {
  user: IUser
}

const CategoryList = ({ user }: CategoryListInterface) => {
  const router = useRouter();
  
  return !!user ? (
    <>
      {user.categories.map(cat => {
        return (
          <Container 
            key={cat.id}
            size="md"
            padding="md"
          >
            <Link href={`/category/${cat.id}`} passHref>
              <Text
                size="xl"
              >
                {cat.name}
              </Text>
            </Link>
          </Container>
        )
      })}
    </>
  ) : (<></>)
}

export default NavCategoryList