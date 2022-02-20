import PublicLayout from '@/components/layouts/PublicLayout';
import { Center, Text } from '@mantine/core'
import { ReactElement } from 'react';

interface CategoryIndexPageProps {
  
}

const CategoryIndexPage = ({}: CategoryIndexPageProps) => {
  return (
    <Center sx={{ height: "100vh" }}>
      <Text size='xl'>
        Click one of your Categories or create one!
      </Text>
    </Center>
  );
}

CategoryIndexPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default CategoryIndexPage