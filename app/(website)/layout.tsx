import MobileSearch from "components/ui/MobileSearch";
import WebsiteHeader from "components/ui/WebsiteHeader";
import { Fragment, ReactNode } from "react";

export const instant = false;

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <WebsiteHeader />
      {children}
      <MobileSearch />
    </Fragment>
  );
}
