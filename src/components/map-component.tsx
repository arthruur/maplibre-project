import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MouseCoordinates from './ui/mouse-coordinates';
import ScaleControlComponent from './ui/scale-control';
import geodatin from '../assets/geodatin.png';
import { MapControls } from './ui/map-controls';

const MapWithMouseCoordinates: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, lng: 0, lat: 0 });
  const [zoom] = useState(3.5); // Estado para o zoom
  const [isExpanded, setIsExpanded] = useState(true); // Estado para o mapa expandido

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
  }, [zoom]); // Adiciona zoom como dependência para atualizar o mapa

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
      {/* Container do mapa com largura e altura condicionais */}
      <div
        ref={mapContainer}
        className={`transition-all duration-500 ${
          isExpanded ? 'w-full h-full' : 'w-[60%] h-[100%]'
        }`}
      ></div>

      {/* Componente de escala */}
      <ScaleControlComponent map={map.current} />

      {/* Componente de controle do mapa */}
      {map.current && (
  <MapControls
    map={map.current}
    initialZoom={zoom}
    initialIsExpanded={isExpanded}
    setIsExpanded={setIsExpanded}
  />)} 

      {/* Informações do mouse */}
      <MouseCoordinates coordinates={coordinates} handleLocateClick={handleLocateClick} />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6">
        <img src={geodatin} alt="Mapbiomas logo" className="h-[24px] filter invert" />
      </div>
    </div>
  );
};

export default MapWithMouseCoordinates;

