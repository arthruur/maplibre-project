import { LocateFixed } from 'lucide-react';

interface Coordinates {
  lng: number;
  lat: number;
}

interface MouseCoordinatesProps {
  coordinates: Coordinates;
  handleLocateClick: () => void;
}

const MouseCoordinates = ({ coordinates, handleLocateClick }: MouseCoordinatesProps) => {
  return (
    <div className="absolute z-10 bottom-4 left-4 bg-gray-100 bg-opacity-90 rounded-2xl text-center text-sm">
      <div className="flex items-center gap-2">
        <div
          className="bg-white p-3 rounded-s-xl cursor-pointer hover:bg-gray-200 hover:border-2 hover:border-gray-400 transition duration-200"
          onClick={handleLocateClick}
        >
          <LocateFixed />
        </div>
        <span className="mr-4 text-gray-500">
          {coordinates.lng.toFixed(2)}, {coordinates.lat.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default MouseCoordinates;
