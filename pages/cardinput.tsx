import { Container } from "@mantine/core"
import { Button } from "@mantine/core"
import { Textarea } from "@mantine/core"
import { Center } from "@mantine/core"
import { useForm } from "@mantine/hooks"


const CardInput = () => {
    const form = useForm(
        {
            initialValues: {
                prompt: '',
                response: ''
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

                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Textarea
                        {...form.getInputProps('prompt')}
                        label="Prompt"
                        placeholder="Your cue card prompt"
                        required
                        minRows={3}
                    />
                    <Textarea 
                        {...form.getInputProps('response')}                        
                        label="Response"
                        placeholder="Your cue card response"
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