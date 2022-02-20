import { Group, Text, Button, Avatar } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useAuth, useUser } from "reactfire";

interface UserSectionNavProps {
  
}

const UserSectionNav = ({}: UserSectionNavProps) => {
  const auth = useAuth();
  const user = useUser();

  return (
    <Group position="apart">
      <Avatar
        src={!!user.data?.photoURL ? user.data.photoURL : ""}
        radius="xl"
      />
      <Text>
        {
          user.data?.displayName 
            ? user.data.displayName
            : user.data?.email
        }
      </Text>
      <Button
        color="red"
        size="xs"
        radius="sm"
        onClick={() => signOut(auth)}
      >
        Logout
      </Button>
    </Group>
  );
}

export default UserSectionNav