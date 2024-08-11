import React from 'react';
import { GeoJsonObject } from 'geojson';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import egyptGeoJson from '../assets/eg.json';

const EgyptMap: React.FC = () => {
  // Click on each governorate
  const handleClick = (event: any) => {
    const governorateName = event.target.feature.properties.name;
    alert(`You clicked on ${governorateName}`);
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: handleClick,
    });
  };

  const geoJsonStyle = {
    color: '#ffffff',
    weight: 1,
    fillColor: '#1a1a1a',
    fillOpacity: 0.6,
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer
        center={[26.8206, 30.8025]} // Centered on Egypt
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON
          data={egyptGeoJson as GeoJsonObject} 
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
};

export default EgyptMap;
