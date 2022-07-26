import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { MapMarker, SetMapView } from "..";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap>
        <SetMapView center={center} zoom={5} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker data={countries} casesType={casesType} />
      </LeafletMap>
    </div>
  );
}

export default Map;
