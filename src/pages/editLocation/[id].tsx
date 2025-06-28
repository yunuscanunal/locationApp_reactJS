import * as React from "react";
import { useRouter } from "next/router";
import { useLocationStore } from "../../store/locationStore";
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
import dynamic from "next/dynamic";
const LocationMap = dynamic(() => import("../../components/locationMap"), {
  ssr: false,
});

export default function EditLocation() {
  const router = useRouter();
  const { id } = router.query;
  const locations = useLocationStore((state) => state.locations);
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const rehydrate = useLocationStore((state) => state.rehydrate);
  const toast = useToast();

  React.useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  const location = locations.find((loc) => loc.id === id);

  const [name, setName] = React.useState(location?.name || "");
  const [markerColor, setMarkerColor] = React.useState(
    location?.markerColor || "#3182ce"
  );
  const [latitude, setLatitude] = React.useState(location?.latitude || 0);
  const [longitude, setLongitude] = React.useState(location?.longitude || 0);
  const [markerPos, setMarkerPos] = React.useState<[number, number] | null>(
    location ? [location.latitude, location.longitude] : null
  );

  React.useEffect(() => {
    if (location) {
      setName(location.name);
      setMarkerColor(location.markerColor);
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  }, [location]);

  // Marker değişirse enlem-boylam güncellensin
  React.useEffect(() => {
    if (markerPos) {
      setLatitude(markerPos[0]);
      setLongitude(markerPos[1]);
    }
  }, [markerPos]);

  if (!location) {
    return <Box p={8}>Konum bulunamadı.</Box>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLocation({
      ...location,
      name,
      markerColor,
      latitude,
      longitude,
    });
    toast({ title: "Konum güncellendi!", status: "success" });
    router.push("/");
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="600px" mx="auto">
      <Heading size="md" mb={6}>
        Konumu Düzenle
      </Heading>
      <Box h="300px" mb={8}>
        <LocationMap
          position={markerPos}
          setPosition={setMarkerPos}
          locations={
            markerPos
              ? [
                  {
                    id: location.id,
                    latitude: markerPos[0],
                    longitude: markerPos[1],
                  },
                ]
              : []
          }
        />
      </Box>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Konum Adı</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
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
        <FormControl mb={4} isRequired>
          <FormLabel>Enlem (Latitude)</FormLabel>
          <Input type="number" value={latitude} readOnly />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Boylam (Longitude)</FormLabel>
          <Input type="number" value={longitude} readOnly />
        </FormControl>
        <Flex gap={4} mt={6}>
          <Button colorScheme="blue" type="submit">
            Güncelle
          </Button>
          <Button onClick={() => router.push("/")}>İptal</Button>
        </Flex>
      </Box>
    </Box>
  );
}
