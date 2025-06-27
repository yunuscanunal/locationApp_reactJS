import * as React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocationStore } from "../store/locationStore";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("../components/locationMap"), {
  ssr: false,
});

function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : <Marker position={position} />;
}

export default function AddLocation() {
  const [position, setPosition] = React.useState<[number, number] | null>(null);
  const [name, setName] = React.useState("");
  const [markerColor, setMarkerColor] = React.useState("#3182ce");
  const addLocation = useLocationStore((state) => state.addLocation);
  const locations = useLocationStore((state) => state.locations);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!position || !name) {
      toast({
        title: "Tüm alanları doldurun ve haritadan konum seçin!",
        status: "warning",
      });
      return;
    }
    addLocation({
      id: uuidv4(),
      name,
      latitude: position[0],
      longitude: position[1],
      markerColor,
    });
    toast({ title: "Konum eklendi!", status: "success" });
    router.push("/");
  };

  return (
    <Box p={8} maxW="900px" mx="auto">
      <Heading size="md" mb={6}>
        Konum Ekle
      </Heading>
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Box flex={1} h="400px">
          <LocationMap
            position={position}
            setPosition={setPosition}
            locations={locations}
          />
        </Box>
        <Box flex={1} as="form" onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Konum Adı</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              placeholder="Örn: Ev, Ofis..."
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Marker Rengi</FormLabel>
            <Input
              type="color"
              value={markerColor}
              onChange={(e) => setMarkerColor(e.target.value)}
              w="60px"
              p={0}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" mb={4} width="100%">
            Kaydet
          </Button>
          <Button
            colorScheme="red"
            type="reset"
            mb={4}
            width="100%"
            onClick={() => router.push("/")}
          >
            Geri
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
