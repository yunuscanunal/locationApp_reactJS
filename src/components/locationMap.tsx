import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapResize() {
  //todo for mobile responsive structure
  //map disappear little screens
}
function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : <Marker position={position} />;
}

interface LocationMapProps {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  locations: { id: string; latitude: number; longitude: number }[];
}

const LocationMap: React.FC<LocationMapProps> = ({
  position,
  setPosition,
  locations,
}) => {
  return (
    <MapContainer
      center={[39.92, 32.85]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]} />
      ))}
      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

export default LocationMap;
