import { ReactElement } from 'react'
import Link from 'next/link';
import PublicLayout from '../lib/components/layouts/PublicLayout'
import { Container, Center, TextInput, PasswordInput, Button, Space, Text, Image } from '@mantine/core'

const Home = () => {
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
          <Button 
            component="a" 
            href="/hello" 
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
          <Space h="xs" />
          <Text color="dimmed" size="xs">
            Don't have an account with us yet?&nbsp;
            <Text variant="link" component="a" size="xs">Sign up here!</Text>
          </Text>
        </Container>
      </Center>
    </div>
  )
}

export default Home
