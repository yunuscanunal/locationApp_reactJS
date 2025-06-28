import * as React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  Flex,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useLocationStore } from "../store/locationStore";
import { useEffect } from "react";

export default function Home() {
  const locations = useLocationStore((state) => state.locations);
  const rehydrate = useLocationStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <Box p={{ base: 4, md: 8 }} maxW="600px" mx="auto">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Konumlar</Heading>
        <Link href="/route" passHref legacyBehavior>
          <Button colorScheme="teal">Rota Göster</Button>
        </Link>
      </Flex>
      {locations.length === 0 ? (
        <Text color="gray.500">Henüz hiç konum eklenmedi.</Text>
      ) : (
        <List spacing={3}>
          {locations.map((location) => (
            <ListItem key={location.id}>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box
                    w={4}
                    h={4}
                    bg={location.markerColor}
                    borderRadius="full"
                    mr={3}
                  />
                  <Tooltip
                    label={`Koordinatlar: ${location.latitude}, ${location.longitude}`}
                    hasArrow
                  >
                    <Text fontWeight="medium">{location.name}</Text>
                  </Tooltip>
                </Flex>
                <Link
                  href={`/editLocation/${location.id}`}
                  passHref
                  legacyBehavior
                >
                  <Icon
                    as={ChevronRightIcon}
                    w={6}
                    h={6}
                    color="gray.400"
                    cursor="pointer"
                  />
                </Link>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
      <Link href="/addLocation" passHref legacyBehavior>
        <Button mt={8} colorScheme="blue" width="100%">
          Konum Ekle
        </Button>
      </Link>
    </Box>
  );
}
