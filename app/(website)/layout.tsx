import WebsiteHeader from "components/WebsiteHeader";
import { ReactNode } from "react";

export const instant = false;

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <body>
      <WebsiteHeader />
      {children}
    </body>
  );
}
