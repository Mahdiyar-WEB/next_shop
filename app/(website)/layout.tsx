import RootLayoutHeader from "components/RootLayoutHeader";
import { ReactNode } from "react";

export const instant = false;

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <body>
      <RootLayoutHeader />
      {children}
    </body>
  );
}
