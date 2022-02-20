import { 
  AppShell, 
  Header, 
  Navbar, 
  Text, 
  Burger, 
  MediaQuery, 
  useMantineTheme,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import RouteGuard from "../guards/RouteGuard";
import GlobalLayout from "./GlobalLayout";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();


  return (
    <GlobalLayout>
      <RouteGuard>
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
                <Navbar.Section><p>Top section</p></Navbar.Section>
                <Navbar.Section grow mt="lg"><p>mid section</p></Navbar.Section>
                <Navbar.Section><p>bottom section</p></Navbar.Section>
              </Navbar>
            }
            header={
              <Header height={70} padding="md">
                {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>

                  <Text>Application header</Text>
                </div>
              </Header>
            }
          >
            {/* Body */}
            {children}
          </AppShell>
        </div>
      </RouteGuard>
    </GlobalLayout>
  )
}