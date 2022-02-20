import FlashCardInput from "@/components/flashcard/FlashCardInput";
import { useSingleCategory } from "@/components/hooks/categoryHooks";
import PublicLayout from "@/components/layouts/PublicLayout";
import { ICategory } from "lib/types/category.type";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Container, Grid, Text } from "@mantine/core";
import FlashCard from "@/components/flashcard/FlashCard";
import { capitalizeString } from "lib/functions/utilities";
interface SingleCategoryPageProps {
  
}

const SingleCategoryPage = ({}: SingleCategoryPageProps) => {
  const router = useRouter();
  const {slug} = router.query
  console.log(router.query)
  const { status, data } = useSingleCategory(slug as string)
  const parsedCatName = (data as ICategory)?.name

  return (
    <>
      <FlashCardInput categoryId={slug as string} />
      <Container
        size="md"
        padding="md"
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {!!parsedCatName && (
          <Text size="xl" align="center">{capitalizeString(parsedCatName)}</Text>
        )}
      </Container>

      <Grid>
        {!!data && (data as ICategory).notes.map((note, idx) => {

          return (
            <Grid.Col
              key={note.id}
              md={6}
              xl={3}
            >
              <FlashCard note={note} categoryId={slug as string} />
            </Grid.Col>
          )
        })}
      </Grid>
    </>
  );
}

SingleCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default SingleCategoryPage