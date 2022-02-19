import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

interface GlobalLayoutProps {
  children: ReactNode
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="APP">
      {/* GLOBAL before app loads here */}

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light'
        }}
      >
        <AppWrapper>
          { children }
        </AppWrapper>
      </MantineProvider>
    </div>
  )
}

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <NotificationsProvider>
      <ModalsProvider>
        { children }
      </ModalsProvider>
    </NotificationsProvider>
  )
}

export default GlobalLayout;