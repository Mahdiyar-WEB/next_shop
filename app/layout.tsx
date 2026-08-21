import type { Metadata } from "next";
import vazirFont from "constants/localFont";
import "styles/globals.css";
import { ReactNode } from "react";
import { QueryProvider } from "providers/query-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "theme/theme";
import ToastProvider from "./ToastProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | ویرا",
    default: "ویرا", // a default is required when creating a template
  },
  description: "وب اپلیکیشن ویرا",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" className={`${vazirFont.variable} font-sans`} dir="rtl">
      <body className="min-h-full">
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ToastProvider />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
