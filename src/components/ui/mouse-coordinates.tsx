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
    <div className="absolute z-10 bottom-4 left-4 bg-gray-100 bg-opacity-90 dark:bg-gray-800 dark:text-white rounded-2xl text-center text-sm">
      <div className="flex items-center gap-2">
        <div
          className="bg-white p-3 rounded-s-xl cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-200"
          onClick={handleLocateClick}
        >
          <LocateFixed className="text-gray-600 dark:text-gray-200" />
        </div>
        <span className="mr-4 text-gray-500 dark:text-gray-300">
          {coordinates.lng.toFixed(2)}, {coordinates.lat.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default MouseCoordinates;
