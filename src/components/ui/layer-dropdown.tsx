import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Layers } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface MapLayersProps {
  map: maplibregl.Map | null;
}

const MapLayers: React.FC<MapLayersProps> = ({ map }) => {
  const [layersOrder, setLayersOrder] = useState([
    { id: 'camada1', label: 'Azul - 100%' },
    { id: 'camada2', label: 'Vermelho - 60%' },
    { id: 'camada3', label: 'Pontos pretos' },
    { id: 'camada4', label: 'Linhas pretas' },
  ]);
  
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  
  const handleLayerToggle = (layer: string) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layer)) {
        return prevSelectedLayers.filter((item) => item !== layer);
      } else {
        return [...prevSelectedLayers, layer];
      }
    });
  };

  useEffect(() => {
    if (!map) return;
  
    layersOrder.forEach(({ id }) => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
        map.removeSource(`${id}-source`);
      }
    });
  
    layersOrder.forEach(({ id }) => {
      if (selectedLayers.includes(id)) {
        if (id === 'camada1') {
          map.addSource('camada1-source', {
            type: 'geojson',
            data: 'src/layers/map.geojson',
          });
          map.addLayer({
            id: 'camada1',
            type: 'fill',
            source: 'camada1-source',
            paint: {
              'fill-color': '#198EC8',
              'fill-opacity': 1,
            },
          });
        }
        else if (id === 'camada2') {
          map.addSource('camada2-source', {
            type: 'geojson',
            data: 'src/layers/map(1).json',
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
        else if (id === 'camada3') {
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
        else if (id === 'camada4') {
          map.addSource('camada4-source', {
            type: 'geojson',
            data: 'src/layers/map (3).json', 
          });
      
          map.addLayer({
            id: 'camada4',
            type: 'line',
            source: 'camada4-source',
          });
        }
      }
    });

    return () => {
      layersOrder.forEach(({ id }) => {
        if (map.getLayer(id)) {
          map.removeLayer(id);
          map.removeSource(`${id}-source`);
        }
      });
    };
  }, [map, layersOrder, selectedLayers]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;

        const reorderedLayers = Array.from(layersOrder);
        const [removed] = reorderedLayers.splice(result.source.index, 1);
        reorderedLayers.splice(result.destination.index, 0, removed);

        setLayersOrder(reorderedLayers);
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center gap-2 rounded-full bg-white p-3 shadow-md hover:bg-gray-200 transition-all"
        >
          <Layers size={20} className="text-gray-600" />
          <span className="text-gray-600"> Legendas </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="rounded-lg bg-white p-2 shadow-lg ml-6 mt-2">
          <DropdownMenuLabel className="font-semibold text-gray-700">Escolha uma camada</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Droppable droppableId="layers">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {layersOrder.map(({ id, label }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 rounded hover:bg-gray-100 flex justify-between items-center"
                      >
                        <DropdownMenuCheckboxItem
                          checked={selectedLayers.includes(id)}
                          onCheckedChange={() => handleLayerToggle(id)}
                          className="text-gray-800"
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DropdownMenuContent>
      </DropdownMenu>
    </DragDropContext>
  );
};

export default MapLayers;
