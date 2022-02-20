import FlashCardInput from "@/components/flashcard/FlashCardInput";
import { useSingleCategory } from "@/components/hooks/categoryHooks";
import PublicLayout from "@/components/layouts/PublicLayout";
import { ICategory } from "lib/types/category.type";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Grid, Text } from "@mantine/core";
import FlashCard from "@/components/flashcard/FlashCard";
interface SingleCategoryPageProps {
  
}

const SingleCategoryPage = ({}: SingleCategoryPageProps) => {
  const router = useRouter();
  const {slug} = router.query
  console.log(router.query)
  const { status, data } = useSingleCategory(slug as string)

  return (
    <>
      <Text size="lg">{(data as ICategory)?.name}</Text>
      <FlashCardInput categoryId={slug as string} />

      <Grid>
        {!!data && (data as ICategory).notes.map((note, idx) => {

          return (
            <Grid.Col
              key={note.id}
              md={6}
              xl={3}
            >
              <FlashCard note={note} />
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