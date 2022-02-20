import { Container, Center, TextInput, PasswordInput, Button, Space, Text, Image, Group } from '@mantine/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from 'reactfire';

const Home = () => {
  const provider = new GoogleAuthProvider();
  const fbAuth = useAuth();

  const signinThroughGoogle = () => {
    console.log("Signin through google");
    signInWithPopup(fbAuth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    })
  }

  return (
    <div style={{
      display: "flex", 
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#023047"
    }}>
      {/* <Link href="/hello" passHref>
        <Button component="a">Next link button</Button>
      </Link> */}
      <Center>
        <Container size="md" padding="xl" style={{ 
          paddingTop: "2em",
          paddingBottom: "2em",
          backgroundColor: "white",
          borderRadius: 5
        }}>
          <Image width={200} height={150} src={""} withPlaceholder />
          <TextInput 
            placeholder="john@placeholder.com" 
            label="Email Address" 
            radius="sm" 
            size="xs" 
            required
          />
          <Space h="xs" />
          <PasswordInput 
            placeholder="Password" 
            label="Password" 
            radius="sm"
            size="xs"
            required
          />
          <Space h="md" />
          <Group direction='column' grow>
            <Button 
              variant="white" 
              size="xs" 
              radius="sm"
              styles={(theme) => ({
                root: {
                  borderColor: theme.colors.blue[8]
                }
              })}>
              Sign In
            </Button>
            <Button
              variant='white'
              size='xs'
              radius="sm"
              styles={(theme) => ({
                root: {
                  borderColor: theme.colors.blue[8]
                }
              })}
              onClick={() => signinThroughGoogle()}
            >
              Google Sign In
            </Button>

          </Group>
          <Space h="xs" />
          <Text color="dimmed" size="xs">
            Don&apos;t have an account with us yet?&nbsp;
            <Text 
              variant="link" 
              component="a" 
              size="xs" 
              onClick={() => console.log("hello")}
            >Sign up here!</Text>
          </Text>
        </Container>
      </Center>
    </div>
  )
}

export default Home
