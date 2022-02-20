import { Container } from "@mantine/core"
import { Button } from "@mantine/core"
import { Textarea } from "@mantine/core"
import { Center } from "@mantine/core"
import { useForm } from "@mantine/hooks"

async function getKeywords<Str extends string>(anAnswer: Str) {
    const response = await fetch("./api/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({answer: anAnswer}),
    });
    const data = await response.json();
    console.log(data.result);
}

const CardInput = () => {
    const form = useForm(
        {
            initialValues: {
                prompt: '',
                answer: ''
            }
        }
    )

    return (
        <>
            <Container
                size="xl"
                style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                }}
            >
                <h1>✨Create a Cue Card</h1>
                <Container style={{width: "100%"}}>

                <form onSubmit={form.onSubmit((values) => getKeywords(values.answer))}>
                    <Textarea
                        {...form.getInputProps('prompt')}
                        label="Prompt"
                        placeholder="Your cue card prompt"
                        required
                        minRows={3}
                    />
                    <Textarea 
                        {...form.getInputProps('answer')}                        
                        label="Answer"
                        placeholder="Your cue card answer"
                        required

                        minRows={5}
                    />
                    <Center
                        style={{ padding: 15 }}
                    >
                        <Button 
                            type="submit"
                            variant="gradient"
                            size="md"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 135 }}
                        >
                            Add Cue Card
                        </Button>
                    </Center>
                </form>
                </Container>

            </Container>
        </>
    )
}

export default CardInput