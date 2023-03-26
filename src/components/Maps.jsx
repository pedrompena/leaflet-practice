import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../assets/location.svg";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: Icon,
  iconSize: [38, 38],
});

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition), map.getZoom(), { animate: true });
    }
  }, [selectPosition]);

  return null;
}

export const Maps = ({ selectPosition }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=ZTO8hEjoWGXdHEQ5NNgY"
      />
      {selectPosition && (
        <Marker position={selectPosition} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};
