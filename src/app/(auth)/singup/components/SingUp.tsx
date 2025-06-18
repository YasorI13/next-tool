"use client"
import React from 'react'
import classes from './SingUp.module.css'
import { Anchor, Container, rem, Tabs, Text, Title } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import SingUpFrom from './SingUpFrom'

function SingUp() {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          ฝ่ายบำรุงรักษาไฟฟ้า
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
              สมัครสมาชิก
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Egat">
            <SingUpFrom />
          </Tabs.Panel>
        </Tabs>

      </Container>
    </>
  )
}

export default SingUp