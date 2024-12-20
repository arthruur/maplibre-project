import { useState } from 'react';
import { Header } from "./components/header";
import MapComponent from "./components/map-component";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full fixed inset-0 overflow-hidden">
      <div className="flex-grow overflow-hidden">
      {!isFullScreen && <Header />}
      </div>
      <MapComponent isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
    </div>
  );
}

export default App;