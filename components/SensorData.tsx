 "use client";

import { useSession, signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const SENSOR_CONFIG: {
  key: SensorKey;
  label: string;
  optimal: [number, number];
  color: string;
}[] = [
  { key: "temperature", label: "Temperature (°C)", optimal: [20, 26], color: "#f59e42" },
  { key: "humidity", label: "Humidity (%)", optimal: [55, 75], color: "#42a5f5" },
  { key: "ph", label: "pH Level", optimal: [5.8, 6.5], color: "#66bb6a" },
  { key: "ec", label: "EC (mS/cm)", optimal: [1.2, 2.0], color: "#ab47bc" },
  { key: "light", label: "Light (lux)", optimal: [10000, 20000], color: "#ffd600" },
];

type SensorKey = "temperature" | "humidity" | "ph" | "ec" | "light";

type SensorData = {
  timestamps: string[];
  temperature: number[];
  humidity: number[];
  ph: number[];
  ec: number[];
  light: number[];
  latest: Record<SensorKey, number>;
  source?: string;
  lastUpdated?: string;
};

function getStatusColor(value: number, [min, max]: [number, number], color: string) {
  if (value < min || value > max) return "#ef5350";
  return color;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedSensor, setSelectedSensor] = useState<SensorKey>("temperature");
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchSensorData = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/sensors");
      if (!res.ok) {
        throw new Error("Sensor API unavailable");
      }
      const data: SensorData = await res.json();
      if (data.timestamps && data.temperature && Array.isArray(data.temperature)) {
        setSensorData(data);
        return;
      }
      throw new Error("Invalid sensor payload");
    } catch {
      setFetchError("Unable to load sensor data from the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>
          You are not logged in.{" "}
          <button onClick={() => signIn()} className="text-blue-500 underline">
            Login here
          </button>
        </p>
      </div>
    );
  }

  if (isLoading && !sensorData) {
    return (
      <div className="min-h-screen p-6 px-6 mt-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Hydroponics Dashboard</h1>
        <p className="text-gray-600">Loading sensor data from server...</p>
      </div>
    );
  }

  if (fetchError || !sensorData) {
    return (
      <div className="min-h-screen p-6 px-6 mt-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Hydroponics Dashboard</h1>
        <p className="text-red-600">{fetchError || "Loading sensor data..."}</p>
        <button
          onClick={fetchSensorData}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const latest = sensorData.latest;
  const chartSensorData = sensorData[selectedSensor as SensorKey];
  const chartData = Array.isArray(chartSensorData) ? chartSensorData : [];

  const chartOption = {
    title: { 
      text: `${SENSOR_CONFIG.find(s => s.key === selectedSensor)?.label} (Live)`
    },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: sensorData.timestamps.slice(-12) }, // Last 12 points for chart
    yAxis: { type: "value" },
    series: [
      {
        data: chartData.slice(-12),
        type: "line",
        smooth: true,
        lineStyle: {
          color: SENSOR_CONFIG.find(s => s.key === selectedSensor)?.color,
          width: 3,
        },
        itemStyle: {
          color: SENSOR_CONFIG.find(s => s.key === selectedSensor)?.color,
        },
      },
    ],
  };

  const sensorColor = (key: SensorKey) => 
    getStatusColor(latest[key], SENSOR_CONFIG.find(s => s.key === key)?.optimal || [0,0], 
                   SENSOR_CONFIG.find(s => s.key === key)?.color || '#000');

  return (
    <div className="min-h-screen p-6 px-6 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Hydroponics Dashboard</h1>
      <p className="mt-2 text-center">Hello, {session.user?.name || "User"}!</p>
      <p className="mt-1 text-center">Email: {session.user?.email}</p>
      
      {isLoading && (
        <div className="text-center mb-4 p-4 bg-blue-100 rounded-lg">Refreshing sensor data...</div>
      )}

      <div className="text-center mb-4 p-4 bg-green-100 rounded-lg">
        Data source: {sensorData.source || "database"} · Last update:{" "}
        {sensorData.lastUpdated
          ? new Date(sensorData.lastUpdated).toLocaleString()
          : new Date().toLocaleString()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {SENSOR_CONFIG.map(sensor => {
          const key = sensor.key as SensorKey;
          const value = latest[key];
          const color = sensorColor(key);
          return (
            <div
              key={sensor.key}
              className="rounded-xl shadow-md p-5 flex flex-col items-center cursor-pointer transition-all hover:scale-105"
              style={{
                background: "#fff",
                border: `3px solid ${color}`,
                boxShadow: `0 4px 12px ${color}44`,
              }}
              onClick={() => setSelectedSensor(key)}
            >
              <span className="text-lg font-semibold mb-2">{sensor.label}</span>
              <span className="text-3xl font-bold" style={{ color }}>{value.toFixed(1)}</span>
              <span className="text-xs mt-1 px-2 py-1 bg-gray-100 rounded-full">
                {value < sensor.optimal[0] || value > sensor.optimal[1] ? "⚠️ Out of range" : "✅ Optimal"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <ReactECharts option={chartOption} style={{ height: "400px", width: "100%" }} />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
<h2 className="text-xl font-bold mb-4 text-green-700">🤖 AI Suggestions</h2>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>pH {sensorData.latest.ph.toFixed(1)} – optimal [5.8, 6.5]</li>
            <li>EC {sensorData.latest.ec.toFixed(1)} mS/cm – optimal [1.2, 2.0]</li>
            <li>{sensorData.latest.temperature.toFixed(1)}°C – perfect for root growth [20-26°C]</li>
            <li>Humidity {sensorData.latest.humidity.toFixed(0)}% – ideal [55-75%]</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-green-700">📡 System Status</h2>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>Sensors: {SENSOR_CONFIG.length} active</li>
            <li>Data source: MongoDB via /api/sensors</li>
            <li>Hardware POST endpoint: /api/sensors</li>
            <li>Last update: {new Date(sensorData.lastUpdated || Date.now()).toLocaleTimeString()}</li>
            <li>Water pump: Auto | Lights: {sensorData.latest.light > 5000 ? 'On' : 'Off'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

