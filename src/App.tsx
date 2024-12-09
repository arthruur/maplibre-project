import { Header } from "./components/header";
import MapComponent from "./components/map-component";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapComponent />
    </div>
  );
}

export default App;
