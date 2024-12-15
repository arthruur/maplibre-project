import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

interface MapLayersProps {
  map: maplibregl.Map | null;
  selectedLayer: string | null;
}

const MapLayers: React.FC<MapLayersProps> = ({ map, selectedLayer }) => {
  useEffect(() => {
    if (!map) return;

    // Remove camadas anteriores, se existirem
    if (map.getLayer('camada1')) {
      map.removeLayer('camada1');
    }

    if (map.getLayer('camada2')) {
      map.removeLayer('camada2');
    }

    if (!selectedLayer) return;

    // Adicionando a camada selecionada
    if (selectedLayer === 'camada1') {
      map.addSource('camada1-source', {
        type: 'geojson',
        data: 'src/layers/map.geojson'
      });

      map.addLayer({
        id: 'camada1',
        type: 'fill',
        source: 'camada1-source',
        paint: {
          'fill-color': '#198EC8',
          'fill-opacity': 0.6,
        },
      });
    } else if (selectedLayer === 'camada2') {
      // Lógica para camada 2 (ou outras camadas)
    }

    return () => {
      // Remover camadas ao sair
      if (map.getLayer('camada1')) {
        map.removeLayer('camada1');
      }
    };
  }, [map, selectedLayer]);

  return null;
};

export default MapLayers;
