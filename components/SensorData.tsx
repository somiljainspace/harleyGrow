import React from 'react';

const SensorData = () => {
  // Replace with actual sensor data fetching logic
  const sensorData = [
    { id: 1, name: 'Temperature', value: '22°C' },
    { id: 2, name: 'Humidity', value: '60%' },
    { id: 3, name: 'pH Level', value: '6.5' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Sensor Data</h2>
      <ul className="mt-4">
        {sensorData.map((sensor) => (
          <li key={sensor.id} className="mb-2">
            <strong>{sensor.name}:</strong> {sensor.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorData;