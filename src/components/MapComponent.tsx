import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DenainaLocation } from "../types";
import denainaLocationsMockData from "../data/denainaLocationsMock.json";
import FullScreenInfo from "./FullScreenInfo";

function MapComponent() {
  const [denainaLocationsMock] = useState<DenainaLocation[]>(
    denainaLocationsMockData as DenainaLocation[]
  );
  const [currentLocation, setCurrentLocation] =
    useState<DenainaLocation | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState<boolean>(false);

  function onPinClick(location: DenainaLocation) {
    setCurrentLocation(location);
    setIsMainPopupOpen(true);
  }

  function onCloseMainPopup() {
    setCurrentLocation(null);
    setIsMainPopupOpen(false);
  }

  return (
    <div 
      style={{
        height: "calc(100vh - 50px)",
        position: 'relative'
      }}
    >
      <MapContainer
        center={[61.2176, -149.8997]}
        zoom={9}
        minZoom={7}
        style={{  height: "100%",width: "100vw" }}
        maxBounds={[
          [58.78879, -153.63653],
          [62.7745, -146.17683],
        ]}
        maxBoundsViscosity={0.5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {denainaLocationsMock.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates as [number, number]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              mousedown: () => onPinClick(location),
            }}
          >
            <Popup>{location.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <FullScreenInfo
        location={currentLocation}
        isOpen={isMainPopupOpen}
        onClose={onCloseMainPopup}
      />
    </div>
  );
}

export default MapComponent;
