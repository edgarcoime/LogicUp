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
            <Container>
                <h1> ✨Create a Cue Card</h1>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Textarea
                        {...form.getInputProps('prompt')}
                        label="Prompt"
                        placeholder="Your cue card prompt"
                        autosize
                        required
                        minRows={5}
                    />
                    <Textarea 
                        {...form.getInputProps('response')}                        
                        label="Response"
                        placeholder="Your cue card response"
                        autosize
                        required
                        minRows={10}
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
        </>
    )
}

export default CardInput