import { Button } from "@/components/ui/button"
import { Plus, Minus, Navigation2, Maximize2, Minimize2 } from "lucide-react"
import { useState, useEffect } from "react"

interface MapControlsProps {
  map: maplibregl.Map
  initialZoom?: number
  initialIsExpanded?: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>> // Prop para receber a função setIsExpanded
}

export const MapControls: React.FC<MapControlsProps> = ({
  map,
  initialZoom = 100,
  initialIsExpanded = true,
  setIsExpanded, // Recebe a função setIsExpanded como prop
}) => {
  const [zoom, setZoom] = useState(initialZoom)
  const [bearing, setBearing] = useState(0) // Estado para armazenar a rotação da bússola
  const [pitch, setPitch] = useState(0) // Estado para armazenar a inclinação do mapa

  // Função para controlar o zoom
  const handleZoom = (type: 'in' | 'out') => {
    if (type === 'in') {
      const newZoom = zoom + 1
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
    if (type === 'out') {
      const newZoom = zoom - 1
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  // Função para alternar o tamanho do mapa (expandido ou minimizado)
  const toggleMapSize = () => {
    setIsExpanded(prevState => !prevState) // Usando a função setIsExpanded passada como prop
  }

  // Função para atualizar o ângulo da bússola conforme a rotação do mapa
  const updateCompass = () => {
    const currentBearing = map.getBearing()
    setBearing(currentBearing)
  }

  // Usando useEffect para escutar a rotação do mapa
  useEffect(() => {
    map.on('rotate', updateCompass) // Adiciona o evento de rotação do mapa
    return () => {
      map.off('rotate', updateCompass) // Limpa o evento de rotação ao desmontar o componente
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  useEffect(() => {
    if (map.getPitch()) {
      // Atualiza o pitch no estado sempre que o mapa mudar de pitch
      const updatePitch = () => {
        const newPitch = map.getPitch();
        setPitch(newPitch);
      };
  
      map.on('pitch', updatePitch); // Adiciona o evento para monitorar mudanças no pitch
  
      return () => {
        map.off('pitch', updatePitch); // Limpa o evento ao desmontar o componente
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Este useEffect deve ser executado apenas uma vez, ao montar o componente
  


  // Função para controlar o pitch (inclinação) do mapa
  const handlePitch = () => {
    let newPitch = pitch
    
    newPitch = 0; // Resetando o pitch para 0

    map.setPitch(newPitch)
    setPitch(newPitch)
  }
  console.log(pitch)

  return (
    <div className="fixed left-0 bottom-24 flex flex-col gap-2 p-4">
      {/* Bússola */}
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={() => {
          // Restaurando a rotação (bearing) e o pitch
          map.rotateTo(0);  // Restaura a rotação para 0
          map.setBearing(0); // Restaura o ângulo de rotação
          handlePitch(); // Reseta o pitch para 0
        }}
      >
        <Navigation2
          className="h-4 w-4"
          style={{
            transform: `rotate(${bearing}deg) rotateX(${pitch}deg)`, // Rotaciona o ícone da bússola
            transition: 'transform 0.3s ease-in-out', // Transição suave
          }}
        />

      </Button>
      <div className="flex flex-col gap-1">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => handleZoom('in')}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => handleZoom('out')}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={toggleMapSize}
      >
        {initialIsExpanded ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>

    </div>
  )
}
