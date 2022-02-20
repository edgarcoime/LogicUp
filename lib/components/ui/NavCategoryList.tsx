import { useUserCategories } from "../hooks/categoryHooks";
import { Button, Container, Text } from '@mantine/core'
import { IUser } from "lib/types/user.type";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "reactfire";

interface NavCategoryListProps {
  
}

const NavCategoryList = ({}: NavCategoryListProps) => {
  const user = useUser();
  const { data } = useUserCategories();

  return (
    <>
      <Text size="xl" align="center">
        Categories
      </Text>

      {!!user.data && (<CategoryList user={(data as IUser)} />)}
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
            sx={{
              marginTop: "10px"
            }}
          >
            <Link href={`/category/${cat.id}`} passHref>
              <Text
                size="lg"
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