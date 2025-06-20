"use client";
import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  Image,
  rem,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
// import { useHeadroom } from '@mantine/hooks';
import { signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import NextImage from "next/image";
import {
  Icon360View,
  IconCaretDown,
  IconCategoryPlus,
  IconLogin,
  IconLogout,
  IconPaperclip,
  IconPlane,
  IconTools,
} from "@tabler/icons-react";

import classes from "./BasicAppShell.module.css";
import { http } from "@/services/http-service";

type toolslist = {
  id: number;
  name: string;
};
export function BasicAppShell({ children }: { children: React.ReactNode }) {
  // const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // const router = useRouter();
  const { data: session, status } = useSession();
  // const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle }] = useDisclosure();
  const [toolslist, setToolslist] = useState<toolslist[]>([]);

  const [costCtr, setCostCtr] = useState("");

  const [basePath, setBasePath] = useState("");
  const [basePathId, setBasePathId] = useState("");

  // const { colorScheme, setColorScheme } = useMantineColorScheme({
  //     keepTransitions: true,
  // });
  // const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (session?.user?.address) {
      setCostCtr(session?.user?.address);
    }
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "Admin" || session.user.role === "spAdmin") {
        setPermission(true);
      }
    }
  }, [status, session]);

  useEffect(() => {
    if (pathname) {
      const data = pathname.split("/")[1];
      const data2 = pathname.split("/")[2];
      setBasePath(data);
      setBasePathId(data2);
    }
  }, [pathname]);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchPermission = async () => {
        const res = await http(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/emdtools_v1/getPersonOptions`
        );
        if (res.data.options) {
          setToolslist(res.data.options.groupTools);
        }
      };
      fetchPermission();
    }
  }, [session]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Link href={"/"}>
              <Image
                component={NextImage}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/engy-30.png`}
                alt="EGAT"
                width={120}
                height={220}
                style={{
                  width: "Auto",
                  height: "50px",
                }}
                priority
              />
            </Link>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => router.push("/user")}
              >
                {session?.user?.name}
              </UnstyledButton>

              {session?.user ? (
                <ActionIcon
                  onClick={() => signOut()}
                  variant="default"
                  size="xl"
                  mr={10}
                >
                  <IconLogout stroke={1.5} />
                </ActionIcon>
              ) : (
                <ActionIcon
                  onClick={() => signIn()}
                  variant="default"
                  size="xl"
                  mr={10}
                >
                  <IconLogin stroke={1.5} />
                </ActionIcon>
              )}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <UnstyledButton
          className={classes.control}
          onClick={() => {
            router.push("/emd");
            toggle();
          }}
          style={{
            backgroundColor: basePath === "emd" ? "#e2facd" : "",
          }}
        >
          <Flex justify="flex-start" align="center" direction="row">
            <Icon360View
              className={classes.linkIcon}
              stroke={1.5}
              style={{ marginRight: "12px" }}
            />
            ภาพรวม อบฟ.
          </Flex>
        </UnstyledButton>
        {toolslist.length > 0 &&
          toolslist.map((tool) => {
            return (
              <UnstyledButton
                key={tool.id}
                className={classes.control}
                onClick={() => {
                  router.push(`/g/${tool.id}`);
                  toggle();
                }}
                style={{
                  backgroundColor: (basePath === "g" && basePathId === String(tool.id)) ? "#e2facd" : "",
                }}
              >
                <Flex justify="flex-start" align="center" direction="row">
                  <IconCaretDown
                    className={classes.linkIcon}
                    stroke={1.5}
                    style={{ marginRight: "12px" }}
                  />
                  {tool.name}
                </Flex>
              </UnstyledButton>
            );
          })}

        {costCtr && (
          <>
            <UnstyledButton
              className={classes.control}
              onClick={() => {
                router.push(`/ppl/${costCtr}`);
                toggle();
              }}
              style={{
                backgroundColor: basePath === "ppl" ? "#e2facd" : "",
              }}
            >
              <Flex justify="flex-start" align="center" direction="row">
                <IconPlane
                  className={classes.linkIcon}
                  stroke={1.5}
                  style={{ marginRight: "12px" }}
                />
                แผนงานในแผนก
              </Flex>

            </UnstyledButton>


            <UnstyledButton
              className={classes.control}
              onClick={() => {
                router.push(`/toolsList/${costCtr}`);
                toggle();
              }}
              style={{
                backgroundColor: basePath === "toolsList" ? "#e2facd" : "",
              }}
            >
              <Flex justify="flex-start" align="center" direction="row">
                <IconTools
                  className={classes.linkIcon}
                  stroke={1.5}
                  style={{ marginRight: "12px" }}
                />
                เครื่องมือ
              </Flex>

            </UnstyledButton>
            <UnstyledButton
              className={classes.control}
              onClick={() => {
                router.push(`/CertoolsList/${costCtr}`);
                toggle();
              }}
              style={{
                backgroundColor: basePath === "CertoolsList" ? "#e2facd" : "",
              }}
            >
              <Flex justify="flex-start" align="center" direction="row">
                <IconTools
                  className={classes.linkIcon}
                  stroke={1.5}
                  style={{ marginRight: "12px" }}
                />
                เครื่องมือ (สอบเทียบ)
              </Flex>
            </UnstyledButton>

            <UnstyledButton
              className={classes.control}
              onClick={() => {
                router.push(`/groupList/${costCtr}`);
                toggle();
              }}
              style={{
                backgroundColor: basePath === "groupList" ? "#e2facd" : "",
              }}
            >
              <Flex justify="flex-start" align="center" direction="row">
                <IconCategoryPlus
                  className={classes.linkIcon}
                  stroke={1.5}
                  style={{ marginRight: "12px" }}
                />
                CustomsList
              </Flex>
            </UnstyledButton>
            <UnstyledButton
              className={classes.control}
              onClick={() => {
                router.push(`/borrow/${costCtr}`);
                toggle();
              }}
              style={{
                backgroundColor: basePath === "borrow" ? "#e2facd" : "",
              }}
            >
              <Flex justify="flex-start" align="center" direction="row">
                <IconPaperclip
                  className={classes.linkIcon}
                  stroke={1.5}
                  style={{ marginRight: "12px" }}
                />
                ใบยืมเครื่องมือ
              </Flex>
            </UnstyledButton>
          </>
        )}

        {session?.user ? (
          <UnstyledButton className={classes.control} onClick={() => signOut()}>
            <Flex justify="flex-start" align="center" direction="row">
              <IconLogout
                className={classes.linkIcon}
                stroke={1.5}
                style={{ marginRight: "12px" }}
              />
              signOut
            </Flex>
          </UnstyledButton>
        ) : (
          <UnstyledButton className={classes.control} onClick={() => signIn()}>
            <Flex justify="flex-start" align="center" direction="row">
              <IconLogin
                className={classes.linkIcon}
                stroke={1.5}
                style={{ marginRight: "12px" }}
              />
              signIn
            </Flex>
          </UnstyledButton>
        )}
      </AppShell.Navbar>
      <AppShell.Main
        bg={"gray.1"}
        pt={{
          base: `calc(${rem(46)} + var(--mantine-spacing-md))`,
          sm: `calc(${rem(52)} + var(--mantine-spacing-md))`,
        }}
        pb={`calc(${rem(50)} + var(--mantine-spacing-md))`}
      >
        {/* <Container fluid> */}
        {children}
        {/* </Container> */}
      </AppShell.Main>
    </AppShell>
  );
}
