import * as React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p={8} textAlign="center">
      <Heading>React Konum Uygulaması</Heading>
      <Text mt={4}>Hoş geldiniz!</Text>
    </Box>
  );
}
