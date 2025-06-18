"use client"
import { Center, Flex, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
        <Center h="100vh">
        <Flex
      mih={50}
    //   bg="rgba(0, 0, 0, .3)"
      gap="xs"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
        <Title>ID อยู่ระหว่างรอการอนุมัติ</Title>
        <Image src="/assets/waiting.png" alt="waiting" width={960} height={500} />
        <p>กรุณารอสักครู่ ติดต่อผู้ดูแลระบบ หรขฟ-ธ. กผงฟ-ธ. อบฟ. โทร 6162</p>
        <Link href="/">กลับสู่หน้าหลัก</Link>
    </Flex>
        </Center>
    </>
  )
}

export default page