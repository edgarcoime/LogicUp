import { ReactNode } from "react";
import LoginGuard from "../guards/LoginGuard";
import GlobalLayout from "./GlobalLayout";


interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({children}: LoginLayoutProps) {
  return (
    <GlobalLayout>
      <LoginGuard>
        {children}
      </LoginGuard>
    </GlobalLayout>
  )
}