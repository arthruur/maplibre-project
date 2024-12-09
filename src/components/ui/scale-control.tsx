import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

interface ScaleControlComponentProps {
  map: maplibregl.Map | null;
}

const ScaleControlComponent: React.FC<ScaleControlComponentProps> = ({ map }) => {
  useEffect(() => {
    if (map) {
      // Criação do controle de escala
      const scale = new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric', // Unidades métricas
      });

      // Adiciona o controle de escala ao mapa
      map.addControl(scale, 'bottom-right');


      return () => {
        // Remove o controle de escala quando o componente for desmontado
        map.removeControl(scale);
      };
    }
  }, [map]);

  return null;
};

export default ScaleControlComponent;
