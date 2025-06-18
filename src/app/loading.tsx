"use client";
import {Loader, } from "@mantine/core";
import React from "react";

function Loading() {
  return (
    <div className="overflow-x-auto flex flex-col justify-center items-center">
      <Loader color="green" size="xl" type="dots" />
    </div>
  );
}

export default Loading;
