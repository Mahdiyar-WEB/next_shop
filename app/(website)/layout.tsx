import WebsiteHeader from "components/WebsiteHeader";
import { Fragment, ReactNode } from "react";

export const instant = false;

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <WebsiteHeader />
      {children}
    </Fragment>
  );
}
