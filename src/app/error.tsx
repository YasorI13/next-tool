"use client";
import {Image, rem, Text } from "@mantine/core";
import React from "react";

function Error() {
  return (
    <div className="overflow-x-auto h-screen flex flex-col justify-center items-center">
      <Text
        pt="md"
        pb={rem(24)}
        size={rem(38)}
        fw={900}
        variant="gradient"
        gradient={{ from: "red", to: "indigo", deg: 0 }}
      >
        Error 404! Page Not Found
      </Text>

      <Image
        style={{ marginTop: "-75px" }}
        radius="md"
        alt="logo"
        src="/images/404-error.gif"
        w="auto"
        fit="contain"
      />
    </div>
  );
}

export default Error;
