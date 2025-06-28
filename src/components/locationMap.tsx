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
import { LocationData } from "../types/location";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapResize() {
  const map = useMap();
  React.useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}
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

function LocationMarker({
  position,
  setPosition,
  color,
}: {
  position: [number, number] | null;
  setPosition: Function;
  color: string;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  if (!position) return null;
  return <Marker position={position} icon={createColorIcon(color)} />;
}

interface LocationMapProps {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  locations: LocationData[];
  selectedColor: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  position,
  setPosition,
  locations,
  selectedColor,
}) => {
  return (
    <MapContainer
      center={[39.92, 32.85]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          icon={createColorIcon(loc.markerColor)}
        />
      ))}

      <LocationMarker
        position={position}
        setPosition={setPosition}
        color={selectedColor}
      />

      <MapResize />
    </MapContainer>
  );
};

export default LocationMap;
