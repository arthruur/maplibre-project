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
    <div className="flex flex-col min-h-[100dvh] w-full fixed inset-0">
      {!isFullScreen && <Header />}
      <MapComponent isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
    </div>
  );
}

export default App;