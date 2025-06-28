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

export default function Route() {
  const locations = useLocationStore((state) => state.locations);
  const [userPos, setUserPos] = React.useState<[number, number] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tarayıcı konum servisini desteklemiyor.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        setError("Konum alınamadı. Lütfen izin verin.");
        setLoading(false);
      }
    );
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
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : !userPos ? (
        <Text color="gray.500">Kullanıcı konumu alınamadı.</Text>
      ) : (
        <Box h="500px">
          <MapContainer
            center={userPos}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userPos} />
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.latitude, loc.longitude]} />
            ))}
            {routePoints.length > 1 && (
              <Polyline positions={routePoints} color="blue" />
            )}
          </MapContainer>
        </Box>
      )}
    </Box>
  );
}
