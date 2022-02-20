import { 
  AppShell, 
  Header, 
  Navbar, 
  Burger, 
  MediaQuery, 
  useMantineTheme,
  Group,
  Avatar,
  Center,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import { useUser } from "reactfire";
import RouteGuard from "../guards/RouteGuard";
import NavAddNewButton from "../ui/NavAddNewButton";
import NavCategoryList from "../ui/NavCategoryList";
import UserSectionNav from "../ui/UserSectionNav";
import GlobalLayout from "./GlobalLayout";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <GlobalLayout>
      <RouteGuard>
        <IntermediateLayout>
          {children}
        </IntermediateLayout>
      </RouteGuard>
    </GlobalLayout>
  )
}

const IntermediateLayout = ({children}: {children: ReactNode}) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme(); 
  const user = useUser();

  return !!user.data ? (
    <div
      style={{ height: "100vh"}}
    >
      <AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        navbar={
          <Navbar
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
          >
            <Navbar.Section><NavAddNewButton /></Navbar.Section>
            <Navbar.Section grow mt="lg"><NavCategoryList /></Navbar.Section>
            <Navbar.Section><UserSectionNav /></Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} padding="md">
            {/* Handle other responsive styles with MediaQuery component or createStyles function */}
            {/* <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}> */}
            <Center sx={{ height: "100%" }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Group 
                  position="right"
                  sx={{
                    width: "100%"
                  }}
                >
                  <Avatar
                    src="/images/logo.png"
                    size="lg"
                  />

                </Group>
            </Center>
            {/* </div> */}
          </Header>
        }
      >
        {/* Body */}
        {children}
      </AppShell>
    </div>
  ) : (
    <></>
  )
}