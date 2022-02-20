import { Anchor, Center, Container } from "@mantine/core";
import { useState } from "react";
import FlashCard from "@/components/flashcard/FlashCard";

const CardsPage = () => {

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
      <FlashCard answer="answer" topic="topic" />
    </main>
  )
}

export default CardsPage;