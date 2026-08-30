import type { Metadata } from "next";
import vazirFont from "constants/localFont";
import "styles/globals.css";
import { ReactNode } from "react";
import { QueryProvider } from "providers/query-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "theme/theme";
import ToastProvider from "./ToastProvider";
import UserProvider from "providers/UserProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | ویرا",
    default: "ویرا", // a default is required when creating a template
  },
  description: "وب اپلیکیشن ویرا",
};

export const instant = false;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="fa"
      className={`${vazirFont.variable} font-sans`}
      dir="rtl"
    >
      <body className="relative">
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ToastProvider />
              <UserProvider>{children}</UserProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
