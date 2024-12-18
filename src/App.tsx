import { useState } from 'react';
import { Header } from "./components/header";
import MapComponent from "./components/map-component";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false); // Estado para tela cheia

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev); // Alterna o estado de tela cheia

    if (!isFullScreen) {
      // Solicita ao navegador entrar em modo tela cheia
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen(); // Tenta colocar o documento em tela cheia
      }
    } else {
      // Solicita ao navegador sair do modo tela cheia
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isFullScreen ? 'overflow-hidden' : ''}`}>
      {/* O Header só será exibido se não estiver em tela cheia */}
      {!isFullScreen && <Header />}
      
      {/* Passando o estado de tela cheia para o MapComponent */}
      <MapComponent isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
    </div>
  );
}

export default App;
