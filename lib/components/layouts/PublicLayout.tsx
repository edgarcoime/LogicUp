import { ReactNode } from "react";
import RouteGuard from "../guards/RouteGuard";
import GlobalLayout from "./GlobalLayout";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <GlobalLayout>
      <RouteGuard>
        <header>
          HEADER
        </header>

        {/* HOC */}
        { children }

        <footer>
          FOOTER
        </footer>
      </RouteGuard>
    </GlobalLayout>
  )
}