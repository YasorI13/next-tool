import type { Metadata } from "next";
import "@/app/globals.css";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
// import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { MantineProvider} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { theme } from "../theme";
import { MobileNavbar } from "../components/MobileNavbar";

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

import  SessionProvider from "../SessionProvider";

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
    
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider theme={theme}>
            <Notifications />
            <ModalsProvider>
              <MobileNavbar>
                {children}
              </MobileNavbar>
            </ModalsProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
    
  );
}
