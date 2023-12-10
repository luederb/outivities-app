import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";
import Link from "next/link";
import styled from "styled-components";

export default function CurrentOutivityMarker({
  outivity,
  position,
  onSetUserPosition,
}) {
  const map = useMapEvents({
    locationfound: (event) => {
      const userCoordinates = event.latlng;
      onSetUserPosition({ lat: userCoordinates.lat, lng: userCoordinates.lng });
      map.flyTo([position[0], position[1]], map.getZoom(12));
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    position && (
      <Marker position={position} icon={blueIcon}>
        <Popup>
          <StyledLink href={`//${outivity.id}`}>
            <h2>{outivity.title}</h2>
          </StyledLink>
          <StyledInfo>in {outivity.area}</StyledInfo>
        </Popup>
      </Marker>
    )
  );
}

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const StyledLink = styled(Link)`
  text-underline-offset: 7px;
  text-decoration-color: var(--third-color);
  text-decoration-thickness: 2px;
  font-size: 10px;
  h2 {
    color: var(--third-color);
    margin: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledInfo = styled.p`
  font-size: 11px;
`;
