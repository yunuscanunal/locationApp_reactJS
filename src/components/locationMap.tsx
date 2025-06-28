import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function MapResize() {
  const map = useMap();
  React.useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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
