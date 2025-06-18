"use client";
import React, { useEffect } from "react";

import { useViewportSize } from "@mantine/hooks";

export default function Resizepage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { height, width } = useViewportSize();
  useEffect(() => {
    if (width < 431) {
        document.documentElement.style.fontSize = `85%`;
    } 
    else if (width < 769) {
        document.documentElement.style.fontSize = `90%`;
    }
    else {
        document.documentElement.style.fontSize = `100%`;
    }
  }, [width]);
  return (
    <>
      {/* Width: {width}, height: {height} */}
    </>
  );
}
