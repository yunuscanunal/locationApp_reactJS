// src/components/RouteMap.tsx

import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LocationData } from "../types/location"; // LocationData tipini import edin

// Haversine ve sıralama fonksiyonlarını buraya taşıyoruz
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

function sortLocationsByDistance(
  user: [number, number],
  locations: LocationData[]
) {
  return [...locations].sort(
    (a, b) =>
      haversine(user[0], user[1], a.latitude, a.longitude) -
      haversine(user[0], user[1], b.latitude, b.longitude)
  );
}

interface RouteMapProps {
  userPos: [number, number];
  locations: LocationData[];
}

const RouteMap: React.FC<RouteMapProps> = ({ userPos, locations }) => {
  let routePoints: [number, number][] = [];
  if (userPos && locations.length > 0) {
    const sorted = sortLocationsByDistance(userPos, locations);
    routePoints = [
      userPos,
      ...sorted.map((l) => [l.latitude, l.longitude] as [number, number]),
    ];
  }

  return (
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
  );
};

export default RouteMap;
