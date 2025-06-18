"use client";

import {Anchor,Title,Text,Container,Tabs,rem} from "@mantine/core";
import classes from "./LoginContent.module.css";
import { IconMessageCircle, IconPhoto } from "@tabler/icons-react";

import LoginEgat from "./LoginEgat";
import { LoginShop } from "./LoginShop";


export function LoginContent() {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <>
    
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          {process.env.NEXT_PUBLIC_SYSNAME}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          พัฒนาโดยแผนกระบบงานและข้อมูล{" "}
          <Anchor size="sm" component="button">
            (หรขฟ-ธ.)
          </Anchor>
        </Text>
        <Tabs radius="md" defaultValue="Egat" mt={30}>
          <Tabs.List>
            <Tabs.Tab value="Egat" leftSection={<IconPhoto style={iconStyle} />}>
              พนักงาน
            </Tabs.Tab>
            <Tabs.Tab value="shops" leftSection={<IconMessageCircle style={iconStyle} />}>
              ร้านค้าและสมาชิก
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Egat">
            <LoginEgat />
          </Tabs.Panel>
          <Tabs.Panel value="shops">
            <LoginShop />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
