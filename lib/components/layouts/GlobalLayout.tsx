import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useAuth, useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../../firebase/init";

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="APP">
      {/* GLOBAL before app loads here */}
      <FirebaseAppProvider firebaseApp={app}>
        <AppWrapper>{children}</AppWrapper>
      </FirebaseAppProvider>
    </div>
  );
};

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const fbApp = useFirebaseApp();
  const authInstance = getAuth(fbApp);
  const firestoreInstance = getFirestore(fbApp);

  return (
    // Firebase
    <AuthProvider sdk={authInstance}>
      <FirestoreProvider sdk={firestoreInstance}>

        {/* Mantine */}
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default GlobalLayout;
