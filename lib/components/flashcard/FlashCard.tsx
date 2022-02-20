import { Container, Text } from "@mantine/core";
import { useState } from "react";
import { checkOptions } from "reactfire";
import ReactCardFlip from 'react-card-flip'

interface FlashCardProps {
  topic: string,
  answer: string
}

const FlashCard = ({
}: FlashCardProps) => {
  const [flip, setFlip] = useState(false);

  let question = "question";
  let answer = "answer";

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <Container 
        className="front" 
        onClick={() => setFlip(prev => !prev)}
        style={{
          visibility: flip ? "hidden" : "visible"
        }}
      >
        <Text>{question}</Text>
      </Container>

      <Container 
        className="back" 
        onClick={() => setFlip(prev => !prev)}
        style={{
          visibility: !flip ? "hidden" : "visible"
        }}
      >
        <p>{answer}</p>
      </Container>
    </ReactCardFlip>
  )
}

export default FlashCard