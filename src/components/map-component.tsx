import { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  
  // Replace with your actual MapTiler API key
  const API_KEY = 'f03jIH1RTklhW7DPGIIJ';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current || '',
      style: maptilersdk.MapStyle.DATAVIZ,
      center: [-50.34515, -11.71782], // Longitude, Latitude
      zoom: 3.7,
      apiKey: API_KEY
    });
    // Optional: Add navigation controls
    }, []);

  return (
    <div 
      ref={mapContainer} 
      className="map-container" 
      style={{ 
        marginTop: '60px',
        width: '60%', 
        height: '80%', 
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }} 
    />
  );
};

export default MapComponent;