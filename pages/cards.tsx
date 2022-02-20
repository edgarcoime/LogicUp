import { Button } from "@mantine/core";
import { ReactElement, useState } from "react";
import FlashCard from "@/components/flashcard/FlashCard";
import { signOut } from 'firebase/auth';
import PublicLayout from "@/components/layouts/PublicLayout";
import { useAuth } from "reactfire";

const CardsPage = () => {
  const auth = useAuth();
  console.log(process.env.NEXT_PUBLIC_ASSEMBLY_AI);

  return (
    <main
      className="mymain"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </main>
  )
}

CardsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default CardsPage;