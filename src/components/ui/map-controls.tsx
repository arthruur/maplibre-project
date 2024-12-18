import { Button } from "@/components/ui/button";
import { Plus, Minus, Navigation2, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface MapControlsProps {
  map: maplibregl.Map;
  initialZoom?: number;
  initialIsExpanded?: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFullscreen: () => void; 
}

export const MapControls: React.FC<MapControlsProps> = ({
  map,
  initialIsExpanded = true,
  toggleFullscreen,
}) => {
  const [bearing, setBearing] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [isExpanded] = useState(initialIsExpanded);

  // Sincroniza o zoom com o estado real do mapa
  useEffect(() => {
    const updateZoom = () => {
      // Remove setZoom since it's not being used
      map.getZoom();
    };
    map.on("zoom", updateZoom);
    return () => {
      map.off("zoom", updateZoom);}
  }, [map]);

  // Sincroniza a rotação (bearing) com o estado real do mapa
  useEffect(() => {
    const updateBearing = () => setBearing(map.getBearing());
    map.on("rotate", updateBearing);
    return () => {
      map.off("rotate", updateBearing);
    };
  }, [map]);

  // Sincroniza o pitch (inclinação) com o estado real do mapa
  useEffect(() => {
    const updatePitch = () => setPitch(map.getPitch());
    map.on("pitch", updatePitch);
    return () => {
      map.off("pitch", updatePitch);
    };
  }, [map]);

  // Função para alterar o zoom, com limites de zoom mínimo/máximo
  const handleZoom = useCallback(
    (type: "in" | "out") => {
      const currentZoom = map.getZoom();
      const newZoom =
        type === "in"
          ? Math.min(currentZoom + 1, map.getMaxZoom())
          : Math.max(currentZoom - 1, map.getMinZoom());
      map.setZoom(newZoom);
    },
    [map]
  );


  // Reseta o bearing e o pitch para 0
  const resetBearingAndPitch = useCallback(() => {
    map.easeTo({
      bearing: 0,
      pitch: 0,
      duration: 300
    });
    setBearing(0);
    setPitch(0);
  }, [map]);


  return (
    <div className="mt-[608px] flex flex-col gap-2 p-4">
      {/* Bússola */}
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={resetBearingAndPitch}
        title="Resetar rotação e inclinação"
      >
        <Navigation2
          className="h-4 w-4"
          style={{
            transform: `scale(${1 / Math.pow(Math.cos(pitch * (Math.PI / 180)), 0.5)}) 
                        rotateX(${pitch}deg) 
                        rotateZ(${-bearing}deg)`, // Combina o pitch e bearing na rotação
          }}
        />      </Button>

      {/* Controles de zoom */}
      <div className="flex flex-col gap-1">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => handleZoom("in")}
          title="Aumentar zoom"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => handleZoom("out")}
          title="Diminuir zoom"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Controle de tamanho do mapa */}
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={toggleFullscreen}
        title={isExpanded ? "Minimizar mapa" : "Maximizar mapa"}
      >
        {isExpanded ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};