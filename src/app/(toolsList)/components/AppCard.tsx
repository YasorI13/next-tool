import React from "react";
import { Badge, Button, Card, Center, Group, Text } from "@mantine/core";

import classes from "./AppCard.module.css";

import { ToolsDataEx2 } from "../types/types";

type AppCardProps = {
  element: ToolsDataEx2;
};

function AppCard({ element }: AppCardProps) {
  // const picture = "/assets/"+element.picture
  return (
    <>
      <Card
        shadow="md"
        padding="md"
        radius="lg"
        withBorder
        className={classes.card}
        // style={{
        //   backgroundColor: element.toolsStatus === "Active" ? "#c9ffb8" : "#fffd9e",
        // }}
      >
        {/* <Card.Section className={classes.image}>
        <Badge className={classes.status}  color="blue" size="md">On Sale</Badge>
        <AspectRatio className={classes.grow} ratio={1080 / 720} mx="auto">
                <Image
                  src={`/api/uploads/${element.picture}`}
                  sizes="100vw"
                  alt=""
                />
        </AspectRatio>
      </Card.Section> */}

        <Card.Section className={classes.section} pb={2}>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{element.asset}</Text>
            {
              element.toolsStatus === "Active" ? (
                <Badge color="green">on Stock</Badge>
              ) : (
                <Badge color="yellow">offStock</Badge>
              )
            }
          </Group>
        </Card.Section>

        <Card.Section className={classes.section} pb={2}>
          <Text size="sm" c="dimmed">
            {element.assetDescription}
          </Text>
        </Card.Section>

        <Card.Section className={classes.section} pb={2}>
          <Center mt={6} mb={6}>

          <Button size="sm" >
            เพิ่มเครื่องมือ
          </Button>
          </Center>
        </Card.Section>
      </Card>
    </>
  );
}

export default AppCard;
