import PublicLayout from "@/components/layouts/PublicLayout";
import { useRouter } from "next/router";
import CardsPage from "pages/cards";
import { ReactElement } from "react";

interface SingleCategoryPageProps {
  
}

const SingleCategoryPage = ({}: SingleCategoryPageProps) => {
  const router = useRouter();
  const {slug} = router.query
  console.log(router.query)

  return (
    <>
      {slug}
    </>
  );
}

CardsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default SingleCategoryPage