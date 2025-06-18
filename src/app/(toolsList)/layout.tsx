import type { Metadata } from "next";
import "../globals.css";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
// import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { MantineProvider} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { theme } from "../theme";

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

import  SessionProvider from "../SessionProvider";
import { BasicAppShell } from "../components/BasicAppShell";

export const metadata: Metadata = {
  title: `${process.env.SYSNAME}`,  
  description: `${process.env.SYSNAME}`,
  manifest: "/manifest.json",
  icons: {
    icon: '/EGAT-Logo.png',
  },
};

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(options)
  return (
    
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider theme={theme}>
            <Notifications />
            <ModalsProvider>
              <BasicAppShell>
                {children}
              </BasicAppShell>
            </ModalsProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
    
  );
}
