import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MouseCoordinates from './ui/mouse-coordinates';
import ScaleControlComponent from './ui/scale-control';
import geodatin from '../assets/geodatin.png';
import { MapControls } from './ui/map-controls';
import MapLayers from './ui/layer-dropdown';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend do HTML5

interface MapProps {
  isFullScreen: boolean; // Recebe o estado de tela cheia
  toggleFullScreen: () => void; // Função para alternar o estado de tela cheia
}

const Map: React.FC<MapProps> = ({ isFullScreen, toggleFullScreen }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, lng: 0, lat: 0 });
  const [zoom] = useState(3.5); // Estado para o zoom

  useEffect(() => {
    // Inicializa o mapa
    map.current = new maplibregl.Map({
      container: mapContainer.current || '', // container do mapa
      style:
        'https://api.maptiler.com/maps/dataviz/style.json?key=f03jIH1RTklhW7DPGIIJ',
      center: [-51.9253, -14.2350], // Longitude, Latitude do centro do Brasil
      zoom: zoom, // Usando o estado do zoom
      pitch: 0 // Inclinação do mapa
    });

    // Evento de movimentação do mouse
    map.current.on('mousemove', (e) => {
      setCoordinates({
        x: e.point.x,
        y: e.point.y,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      });
    });

    return () => map.current?.remove(); // Remove o mapa ao desmontar o componente
  }, [zoom]);

  // Função para centralizar o mapa no Brasil
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
    <div className="relative w-full h-screen">
      {/* Container do mapa, que ocupa toda a tela se em modo de tela cheia */}
      <div
        ref={mapContainer}
        className={`transition-all duration-500 ${isFullScreen ? 'w-screen h-screen' : 'w-full h-full'}`}
      ></div>

      {/* Componente de escala */}
      <ScaleControlComponent map={map.current} />

      {/* Componente de Camadas */}
      <div className="absolute top-4 left-5 z-10">
        <DndProvider backend={HTML5Backend}>
          <MapLayers map={map.current} />
        </DndProvider>
      </div>

      {/* Componente de controle do mapa */}
      <div className="absolute z-10 bottom-20">
        {map.current && (
          <MapControls
            map={map.current}
            initialZoom={zoom}
            isFullScreen={isFullScreen}
            toggleFullScreen={toggleFullScreen}
          />
        )}
      </div>

      {/* Informações do mouse */}
      <MouseCoordinates coordinates={coordinates} handleLocateClick={handleLocateClick} />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6">
        <img src={geodatin} alt="Mapbiomas logo" className="h-[24px] filter invert" />
      </div>
    </div>
  );
};

export default Map;
