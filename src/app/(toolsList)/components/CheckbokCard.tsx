import { Box, Checkbox, Group, Text } from "@mantine/core";
import classes from "./CheckbokCard.module.css";
import { ToolsDataEx2 } from "../types/types";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { useState } from "react";

type AppCardProps = {
  element: ToolsDataEx2;
};

export default function CheckboxCard({ element }: AppCardProps) {
  const [showData, setShowData] = useState(false);
  return (
    <Checkbox.Card
      className={classes.root}
      radius="md"
      value={element.asset}
      key={element.asset}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>{element.asset}</Text>
          <Text className={classes.description}>
            {element.assetDescription}
          </Text>
          {showData && (
            <>
              <Text className={classes.description}>
                รหัสผู้ปฏิบัติงาน : {element.person.person_thai_thai_firstname + " " + element.person.person_thai_thai_lastname}
              </Text>
              <Text className={classes.description}>
                inventoryNumber : {element.inventoryNumber}
              </Text>
              <Text className={classes.description}>
                licensePlate : {element.licensePlate}
              </Text>
              <Text className={classes.description}>
                manufactureOfAsset : {element.manufactureOfAsset}
              </Text>
              <Text className={classes.description}>
                serialNo : {element.serialNo}
              </Text>
            </>
          )}
        </div>
        <Box
          component="div"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setShowData((prev) => !prev);
          }}
          style={{
            cursor: "pointer",
            padding: 6,
            borderRadius: 6,
            backgroundColor: showData ? "#c9ffb8" : "#fffd9e",
          }}
        >
          {showData ? <IconZoomOut /> : <IconZoomIn />}
        </Box>
      </Group>
    </Checkbox.Card>
  );
}
