"use client";
import { useDisclosure } from '@mantine/hooks';
import { 
  // useComputedColorScheme, 
  ActionIcon, 
  // useMantineColorScheme, 
  AppShell, Burger, Container, Group, Image, UnstyledButton, rem, Center, Text, Flex, } from '@mantine/core';

import classes from './MobileNavbar.module.css';
import NextImage from "next/image";
import Link from 'next/link';
import { 
  // IconSun, 
  IconMoon, IconBellRinging, IconLogin, IconLogout } from '@tabler/icons-react';
// import cx from 'clsx';
import { useHeadroom } from '@mantine/hooks';
import { signIn, signOut } from 'next-auth/react';

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation';


export function MobileNavbar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle }] = useDisclosure();

  // const { colorScheme, setColorScheme } = useMantineColorScheme({
  //   keepTransitions: true,
  // });
  // const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      footer={{ height: { base: 60, sm: 30 }, collapsed: !pinned, offset: false }}
      padding={{ base: "0", sm: "sm" }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Link href={'/'} >
              <Image component={NextImage} src="/images/engy-30.png" alt="EGAT" width={120} height={220}
                style={{
                  width: "Auto",
                  height: "50px",
                }}
                priority
              />
            </Link>
            <Group ml="xl" gap={0} visibleFrom="sm">

              <UnstyledButton className={classes.control} onClick={() => router.push('/booking')}>
                {session?.user?.name}
              </UnstyledButton>
              
              {session?.user ?
                <ActionIcon
                  onClick={() => signOut()}
                  variant="default"
                  size="xl"
                  mr={10}
                >
                  <IconLogout stroke={1.5} />
                </ActionIcon>
                :
                <ActionIcon
                  onClick={() => signIn()}
                  variant="default"
                  size="xl"
                  mr={10}
                >
                  <IconLogin stroke={1.5} />
                </ActionIcon>
              }

              {/* <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
                mr={10}
              >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
              </ActionIcon> */}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" mt={pinned ? 60 : 60}>

        {session && opened && (

          <UnstyledButton className={classes.control} onClick={() => {
            router.push('/booking');
            toggle();
          }}>
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
            >
              <IconMoon className={classes.linkIcon} stroke={1.5} style={{ marginRight: "12px" }} />
              {session?.user?.name}
            </Flex>
          </UnstyledButton>
        )}

    


        {session?.user ? (
          <UnstyledButton className={classes.control} onClick={() => signOut()} >
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
            >
              <IconBellRinging className={classes.linkIcon} stroke={1.5} style={{ marginRight: "12px" }} />
              signOut
            </Flex>
          </UnstyledButton>
        ) : (
          <UnstyledButton className={classes.control} onClick={() => signIn()} >
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
            >
              <IconBellRinging className={classes.linkIcon} stroke={1.5} style={{ marginRight: "12px" }} />
              signIn
            </Flex>
          </UnstyledButton>
        )}
      </AppShell.Navbar>

      <AppShell.Main
        // bg={colorScheme === 'dark' ? 'dark.8' : 'gray.2'}
        pt={{
          base: `calc(${rem(46)} + var(--mantine-spacing-md))`,
          sm: `calc(${rem(52)} + var(--mantine-spacing-md))`
        }}
        pb={`calc(${rem(50)} + var(--mantine-spacing-md))`}
      >
        <Container className={classes.maincontent}
          fluid
          p={10}
          // bg={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
        // style={{ '--radius': '40px', borderRadius: 'var(--radius)'}}
        >
          {children}
        </Container>
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Center h="100%" px="md">
          <Text size="sm" color="dimmed">
            ผู้พัฒนา: หรขฟ-ธ. กผงฟ-ธ. อบฟ. กฟผ. สำนักงานไทรน้อย เบอร์ภายใน: 6162 © 2022 - {new Date().getFullYear()}
          </Text>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}