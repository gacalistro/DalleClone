import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen w-full bg-background">{children}</div>;
}
