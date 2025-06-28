import * as React from "react";
import { Box, Heading, Spinner, Text, Flex, Button } from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocationStore } from "../store/locationStore";
import dynamic from "next/dynamic";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function sortLocationsByDistance(user: [number, number], locations: any[]) {
  return [...locations].sort(
    (a, b) =>
      haversine(user[0], user[1], a.latitude, a.longitude) -
      haversine(user[0], user[1], b.latitude, b.longitude)
  );
}
const MapWithNoSSR = dynamic(() => import("../components/routeMap"), {
  ssr: false,
  loading: () => <Spinner size="xl" />,
});

export default function Route() {
  const locations = useLocationStore((state) => state.locations);
  const [userPos, setUserPos] = React.useState<[number, number] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const defaultPosition: [number, number] = [39.92077, 32.85411];

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        () => {
          setError("Konum alınamadı. Lütfen tarayıcı ayarlarından izin verin.");
          setUserPos(defaultPosition);
          setLoading(false);
        }
      );
    } else {
      setError("Tarayıcınız konum servisini desteklemiyor.");
      setUserPos(defaultPosition);
      setLoading(false);
    }
  }, []);

  let routePoints: [number, number][] = [];
  if (userPos && locations.length > 0) {
    const sorted = sortLocationsByDistance(userPos, locations);
    routePoints = [
      userPos,
      ...sorted.map((l) => [l.latitude, l.longitude] as [number, number]),
    ];
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="900px" mx="auto">
      <Flex align="center" justify="space-between" mb={6}>
        <Heading size="md">Rota Çizimi</Heading>
        <Button onClick={() => history.back()}>Geri</Button>
      </Flex>

      {error && (
        <Text color="orange.500" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Flex justify="center" align="center" h="500px">
          <Spinner />
        </Flex>
      ) : userPos ? (
        <Box h="500px">
          <MapWithNoSSR userPos={userPos} locations={locations} />
        </Box>
      ) : (
        <Text>Konum bilgisi bekleniyor...</Text>
      )}
    </Box>
  );
}
