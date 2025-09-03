"use client";

import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
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

const mockSensorData: Record<SensorKey, number[]> & { timestamps: string[] } = {
  temperature: [22, 23, 24, 25, 24, 23, 22],
  humidity: [60, 62, 65, 70, 68, 66, 64],
  ph: [6.0, 6.1, 6.2, 6.3, 6.2, 6.1, 6.0],
  ec: [1.5, 1.6, 1.7, 1.8, 1.7, 1.6, 1.5],
  light: [12000, 13000, 14000, 15000, 14000, 13000, 12000],
  timestamps: [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ],
};

function getStatusColor(value: number, [min, max]: [number, number], color: string) {
  if (value < min || value > max) return "#ef5350"; // red for out of range
  return color; // optimal color
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedSensor, setSelectedSensor] = useState<SensorKey>("temperature");

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

  const chartOption = {
    title: { text: SENSOR_CONFIG.find(s => s.key === selectedSensor)?.label },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: mockSensorData.timestamps },
    yAxis: { type: "value" },
    series: [
      {
        data: mockSensorData[selectedSensor],
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

  return (
    <div className="min-h-screen  p-6 px-6 mt-16 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Hydroponics Dashboard</h1>
      <p className="mt-2 text-center">Hello, {session.user?.name || "User"}!</p>
      <p className="mt-1 text-center">Email: {session.user?.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {SENSOR_CONFIG.map(sensor => {
          const key = sensor.key as SensorKey;
          const latest = mockSensorData[key][mockSensorData[key].length - 1];
          const color = getStatusColor(latest, sensor.optimal, sensor.color);
          return (
            <div
              key={sensor.key}
              className={`rounded-xl shadow-md p-5 flex flex-col items-center cursor-pointer transition-all`}
              style={{
                background: "#fff",
                border: `2px solid ${color}`,
                boxShadow: `0 2px 8px ${color}33`,
              }}
              onClick={() => setSelectedSensor(key)}
            >
              <span className="text-lg font-semibold mb-2">{sensor.label}</span>
              <span className="text-3xl font-bold" style={{ color }}>{latest}</span>
              <span className="text-xs mt-1" style={{ color }}>
                {latest < sensor.optimal[0] || latest > sensor.optimal[1]
                  ? "Out of optimal range"
                  : "Optimal"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
        <ReactECharts option={chartOption} style={{ height: "350px", width: "100%" }} />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-2 text-green-700">AI Suggestions</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Maintain pH between 5.8 and 6.5 for optimal nutrient absorption.</li>
            <li>Keep EC between 1.2 and 2.0 mS/cm for healthy plant growth.</li>
            <li>Monitor temperature and humidity to prevent disease.</li>
            <li>Ensure adequate light intensity for photosynthesis.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-2 text-green-700">System Status</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>All sensors online</li>
            <li>Water pump: Active</li>
            <li>Nutrient dosing: Scheduled</li>
            <li>Last data sync: 16:00</li>
          </ul>
        </div>
      </div>
    </div>
  );
}