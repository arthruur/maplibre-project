import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Layers } from 'lucide-react'; // Ícone de Layers do Lucide
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem, // Importando o CheckboxItem
} from "@/components/ui/dropdown-menu";

interface MapLayersProps {
  map: maplibregl.Map | null;
}

const MapLayers: React.FC<MapLayersProps> = ({ map }) => {
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]); // Agora é um array de camadas selecionadas

  const handleLayerToggle = (layer: string) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layer)) {
        // Se a camada já está selecionada, remove ela
        return prevSelectedLayers.filter((item) => item !== layer);
      } else {
        // Se não está selecionada, adiciona
        return [...prevSelectedLayers, layer];
      }
    });
  };

  useEffect(() => {
    if (!map) return;

    // Remover camadas anteriores
    const layers = ['camada1', 'camada2', 'camada3', 'camada4'];
    layers.forEach((layer) => {
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
        map.removeSource(`${layer}-source`);
      }
    });

    // Adicionar as camadas selecionadas
    selectedLayers.forEach((layer) => {
      if (layer === 'camada1') {
        map.addSource('camada1-source', {
          type: 'geojson',
          data: 'src/layers/map.geojson', // Usando o GeoJSON carregado
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
      }
      else if (layer === 'camada2') {
        map.addSource('camada2-source', {
          type: 'geojson',
          data: 'src/layers/map(1).json', // Usando o GeoJSON carregado
        });

        map.addLayer({
          id: 'camada2',
          type: 'fill',
          source: 'camada2-source',
          paint: {
            'fill-color': '#FF0000',
            'fill-opacity': 0.6,
          },
        });
      }
      else if (layer === 'camada3') {
        map.addSource('camada3-source', {
          type: 'geojson',
          data: 'src/layers/map (2).json',
        });

        map.addLayer({
          id: 'camada3',
          type: 'circle',
          source: 'camada3-source',
        });
      }
      else if (layer === 'camada4') {
        map.addSource('camada4-source', {
          type: 'geojson',
          data: 'src/layers/map (3).json', 
        });

        map.addLayer({
          id: 'camada4',
          type: 'heatmap',
          source: 'camada4-source',
        });
      }
      
    });
    


    return () => {
      // Remover camadas ao desmontar
      layers.forEach((layer) => {
        if (map.getLayer(layer)) {
          map.removeLayer(layer);
          map.removeSource(`${layer}-source`);
        }
      });
    };
  }, [map, selectedLayers]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-center gap-2 rounded-full bg-white p-3 shadow-md hover:bg-gray-200 transition-all"
      >
        {/* Ícone de Layers */}
        <Layers size={20} className="text-gray-600" />
        <span className="text-gray-600"> Legendas </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg bg-white p-2 shadow-lg ml-6 mt-2">
        <DropdownMenuLabel className="font-semibold text-gray-700">Escolha uma camada</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Camada 1 com checkbox */}
        <DropdownMenuCheckboxItem
          checked={selectedLayers.includes('camada1')}
          onCheckedChange={() => handleLayerToggle('camada1')}
          className="text-gray-800"
        >
          Camada 1
        </DropdownMenuCheckboxItem>

        {/* Camada 2 com checkbox */}
        <DropdownMenuCheckboxItem
          checked={selectedLayers.includes('camada2')}
          onCheckedChange={() => handleLayerToggle('camada2')}
          className="text-gray-800"
        >
          Camada 2
        </DropdownMenuCheckboxItem>

        {/* Camada 3 com checkbox */}
        <DropdownMenuCheckboxItem
          checked={selectedLayers.includes('camada3')}
          onCheckedChange={() => handleLayerToggle('camada3')}
          className="text-gray-800"
        >
          Camada 3
        </DropdownMenuCheckboxItem>

        {/* Camada 4 com checkbox */}
        <DropdownMenuCheckboxItem
          checked={selectedLayers.includes('camada4')}
          onCheckedChange={() => handleLayerToggle('camada4')}
          className="text-gray-800"
        >
          Camada 4
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MapLayers;
