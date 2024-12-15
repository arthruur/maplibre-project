import React from 'react';

interface LocationInfoProps {
  lng: number;
  lat: number;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ lng, lat }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div>
          <div>
            <strong>Longitude:</strong> {lng.toFixed(5)}
          </div>
          <div>
            <strong>Latitude:</strong> {lat.toFixed(5)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
