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
import 'styled-jsx/css'
import { GripVertical } from 'lucide-react'; // Ícone de arrastar (três linhas)

const camada1 = '/layers/map.json';
const camada2 = '/layers/map_1.json';
const camada3 = '/layers/map_2.json';
const camada4 = '/layers/map_3.json';

interface MapLayersProps {
  map: maplibregl.Map | null;
}

const MapLayers: React.FC<MapLayersProps> = ({ map }) => {
  const [layersOrder, setLayersOrder] = useState([
    { id: 'camada1', label: 'Azul - 100%' },
    { id: 'camada2', label: 'Vermelho - 60%' },
    { id: 'camada3', label: 'Pontos pretos' },
    { id: 'camada4', label: 'Linhas pretas' },
    { id: 'camada5', label: 'Mapa de calor' },
  ]);
  
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['camada4', 'camada5']);  

  
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
  
    // Remove layers and sources before adding again
    layersOrder.forEach(({ id }) => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
        map.removeSource(`${id}-source`);
      }
    });
  
      [...layersOrder].reverse().forEach(({ id }) => {
      if (selectedLayers.includes(id)) {
        if (id === 'camada1') {
          map.addSource('camada1-source', {
            type: 'geojson',
            data: camada1,
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
            data: camada2,
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
            data: camada3,
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
            data: camada4, 
          });
      
          map.addLayer({
            id: 'camada4',
            type: 'line',
            source: 'camada4-source',
          });
        }
        else if (id === 'camada5') {
          map.addSource('camada5-source', {
            type: 'geojson',
            data: camada4,
          });
      
          map.addLayer({
            id: 'camada5',
            type: 'heatmap',
            source: 'camada5-source',
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
      if (!result.destination) {
        return; // Não há necessidade de resetar a ordem
      }
        const reorderedLayers = Array.from(layersOrder);
        const [removed] = reorderedLayers.splice(result.source.index, 1);
        reorderedLayers.splice(result.destination.index, 0, removed);

        setLayersOrder(reorderedLayers);
      }}    >
      <DropdownMenu>
        <DropdownMenuTrigger  
          className="flex items-center justify-center gap-2 rounded-full bg-white dark:bg-gray-800 p-3 shadow-md hover:bg-gray-200 transition-all"
        >
          <Layers size={20} className="text-gray-600 dark:text-gray-200" />
          <span className="text-gray-600 dark:text-gray-200"> Legendas </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="rounded-lg dark:bg-gray-800 bg-white p-2 shadow-lg ml-5 mt-2">
  <DropdownMenuLabel className="font-semibold text-gray-700 dark:text-gray-200">Escolha uma camada</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <Droppable droppableId="layers">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {layersOrder.map(({ id, label }, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                style={{
                  ...provided.draggableProps.style,
                   transform: snapshot.isDragging ? `${provided.draggableProps.style?.transform || ''} translate(0px, -130px)` : undefined
                }}
              >
                <div className="flex items-center gap-2">
                  <div {...provided.dragHandleProps} className="cursor-grab">
                    <GripVertical className="h-4 w-4 text-gray-500" />
                  </div>
                  <span
                    className={`w-4 h-4 rounded-sm ${id === 'camada5' ? 'animated-gradient' : ''}`}
                    style={{
                      backgroundColor:
                        id === 'camada1' ? '#198EC8' :
                        id === 'camada2' ? '#FF0000' :
                        id === 'camada3' ? 'black' :
                        id === 'camada4' ? 'white' :
                        id === 'camada5' ? 'transparent' : 'transparent',
                      border: id === 'camada3' || id === 'camada4' ? '2px solid black' : 'none',
                      ...(id === 'camada3' && { borderRadius: '100%' }),
                      ...(id === 'camada5' && {
                        background: 'linear-gradient(45deg, ' +
                          '#0000FF, ' +
                          '#4169E1, ' +
                          '#1E90FF, ' +
                          '#00CED1, ' +
                          '#32CD32, ' +
                          '#7CFC00, ' +
                          '#FFFF00, ' +
                          '#FFA500, ' +
                          '#FF4500, ' +
                          '#FF0000, ' +
                          '#8B0000',
                        backgroundSize: '1000% 1000%',
                        animation: 'gradientFlow 10s ease infinite',
                      }),
                    }}
                  />
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.includes(id)}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleLayerToggle(id);
                    }}
                    className="text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
            )}
          </Draggable>
        ))}
        <style>{`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DropdownMenuContent>
      </DropdownMenu>
    </DragDropContext>
      );
};export default MapLayers;
