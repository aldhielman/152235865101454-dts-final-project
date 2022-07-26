import React from "react";
import { useMap } from "react-leaflet";

export const SetMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return <></>;
};

export default SetMapView;
