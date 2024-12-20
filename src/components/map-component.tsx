import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MouseCoordinates from './ui/mouse-coordinates';
import ScaleControlComponent from './ui/scale-control';
import geodatin from '../assets/geodatin.png';
import { MapControls } from './ui/map-controls';
import MapLayers from './ui/layer-dropdown';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface MapProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const Map: React.FC<MapProps> = ({ isFullScreen, toggleFullScreen }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, lng: 0, lat: 0 });
  const [zoom] = useState(3.5);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current || '',
      style: 'https://api.maptiler.com/maps/dataviz/style.json?key=f03jIH1RTklhW7DPGIIJ',
      center: [-51.9253, -14.2350],
      zoom: zoom,
      pitch: 0
    });

    map.current.on('mousemove', (e) => {
      setCoordinates({
        x: e.point.x,
        y: e.point.y,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      });
    });

    return () => map.current?.remove();
  }, [zoom]);

  const handleLocateClick = () => {
    if (map.current) {
      map.current.flyTo({
        center: [-51.9253, -14.2350],
        zoom: 3.5,
        pitch: 0,
        bearing: 0,
        essential: true,
      });
    }
  };

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden">
      <div
        ref={mapContainer}
        className={`absolute inset-0 ${
          isFullScreen ? 'fixed w-screen h-screen' : 'w-full h-full'
        }`}
      />
      
      <ScaleControlComponent map={map.current} />
      
      <div className="absolute top-4 left-5 z-10">
        <DndProvider backend={HTML5Backend}>
          <MapLayers map={map.current} />
        </DndProvider>
      </div>

      <div className="absolute z-10 bottom-20 left-1">
        {map.current && (
          <MapControls
            map={map.current}
            initialZoom={zoom}
            isFullScreen={isFullScreen}
            toggleFullScreen={toggleFullScreen}
          />
        )}
      </div>

      <MouseCoordinates 
        coordinates={coordinates} 
        handleLocateClick={handleLocateClick} 
      />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <img 
          src={geodatin} 
          alt="Mapbiomas logo" 
          className="h-6 filter invert"
        />
      </div>
    </div>
  );
};

export default Map;