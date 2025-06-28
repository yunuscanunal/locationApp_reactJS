import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LocationData } from "../types/location";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const createColorIcon = (color: string) => {
  const markerHtmlStyles = `
    background-color: ${color};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1rem;
    top: -1rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF;
    box-shadow: 0 0 2px #000;`;

  return L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`,
  });
};

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
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          icon={createColorIcon(loc.markerColor)}
        />
      ))}
      {routePoints.length > 1 && (
        <Polyline positions={routePoints} color="blue" />
      )}
    </MapContainer>
  );
};

export default RouteMap;
