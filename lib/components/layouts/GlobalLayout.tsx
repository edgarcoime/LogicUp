import { ReactNode } from "react";

interface GlobalLayoutProps {
  children: ReactNode
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="APP">
      {/* GLOBAL before app loads here */}
      <AppWrapper>
        { children }
      </AppWrapper>
    </div>
  )
}

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Subsequent wrappers here */}
      { children }
    </>
  )
}

export default GlobalLayout;