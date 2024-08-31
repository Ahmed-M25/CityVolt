import React, { useEffect } from 'react';
import { GeoJsonObject } from 'geojson';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import egyptGeoJson from '../assets/eg.json';

const EgyptMap: React.FC = () => {
  const handleClick = (event: any) => {
    const governorateName = event.target.feature.properties.name;
    alert(`You clicked on ${governorateName}`);
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: handleClick,
    });
  };

  // Colours inspired by Egypt's landscape
  const getColor = (population: number) => {
    return population > 10000000 ? '#FF4500' :  
           population > 5000000  ? '#FF8C00' : 
           population > 2000000  ? '#FFD700' :
           population > 1000000  ? '#ADFF2F' : 
           population > 500000   ? '#00FA9A' : 
           population > 200000   ? '#00CED1' :  
                                   '#1E90FF';  
  };

  const geoJsonStyle = (feature: any) => {
    return {
      color: '#ffffff',
      weight: 1,
      fillColor: getColor(feature.properties.population),
      fillOpacity: 0.6,
    };
  };

  const Legend = () => {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: 'bottomleft' });
  
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 200000, 500000, 1000000, 2000000, 5000000, 10000000];
        const labels = [];
  
        div.innerHTML += '<strong>Population</strong><br>';
  
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
  
        return div;
      };
  
      legend.addTo(map);
  
      return () => {
        map.removeControl(legend);
      };
    }, [map]);
  
    return null;
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
        <Legend />
      </MapContainer>
    </div>
  );
};

export default EgyptMap;
