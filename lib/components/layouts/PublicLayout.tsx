import { ReactNode } from "react";
import GlobalLayout from "./GlobalLayout";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <GlobalLayout>

      <header>
        HEADER
      </header>

      {/* HOC */}
      { children }

      <footer>
        FOOTER
      </footer>

    </GlobalLayout>
  )
}