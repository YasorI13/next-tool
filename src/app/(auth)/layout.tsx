import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";

import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import { theme } from "../theme";

export const metadata: Metadata = {
  title: "Log In",
  description: "Generated by egat team",
  authors: [{ name: "Next.js Team", url: "https://nextjs.org" }],
  viewport: "width=device-width, initial-scale=1, user-scalable=no"
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
