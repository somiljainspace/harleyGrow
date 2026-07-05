import dbConnect from "@/lib/mongodb";
import SensorReading from "@/models/SensorReading";
import type { SensorPayload } from "@/lib/sensors";
import {
  appendGeneratedReadingFromLatest,
  appendSensorReading,
  formatSensorPayload,
  generateSensorHistory,
  seedSensorHistory,
} from "@/lib/sensors";

type StoredReading = {
  timestamp: string;
  temperature: number;
  humidity: number;
  ph: number;
  ec: number;
  light: number;
  source: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __harleygrow_sensor_readings__: StoredReading[] | undefined;
}

const memoryStore: StoredReading[] = [];

function getMemoryStore(): StoredReading[] {
  if (global.__harleygrow_sensor_readings__) {
    return global.__harleygrow_sensor_readings__;
  }
  global.__harleygrow_sensor_readings__ = memoryStore;
  return memoryStore;
}

async function getBlobStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("sensor-readings");
  } catch {
    return null;
  }
}

async function loadBlobReadings(): Promise<StoredReading[]> {
  const store = await getBlobStore();
  if (!store) return [];

  const raw = await store.get("history", { type: "json" });
  return Array.isArray(raw) ? (raw as StoredReading[]) : [];
}

async function saveBlobReadings(readings: StoredReading[]) {
  const store = await getBlobStore();
  if (!store) return;
  await store.setJSON("history", readings.slice(-24));
}

function toPayload(readings: StoredReading[]): SensorPayload {
  return formatSensorPayload(
    readings.map((entry) => ({
      ...entry,
      timestamp: new Date(entry.timestamp),
    }))
  );
}

async function loadFallbackReadings(): Promise<StoredReading[]> {
  const blobReadings = await loadBlobReadings();
  if (blobReadings.length > 0) return blobReadings;

  const memoryReadings = getMemoryStore();
  if (memoryReadings.length > 0) return memoryReadings;

  const seeded = generateSensorHistory("iot-simulator");
  const normalized = seeded.map((entry) => ({
    timestamp: entry.timestamp.toISOString(),
    temperature: entry.temperature,
    humidity: entry.humidity,
    ph: entry.ph,
    ec: entry.ec,
    light: entry.light,
    source: entry.source || "iot-simulator",
  }));

  await saveBlobReadings(normalized);
  getMemoryStore().push(...normalized);
  return normalized;
}

async function saveFallbackReadings(readings: StoredReading[]) {
  const trimmed = readings.slice(-24);
  getMemoryStore().splice(0, getMemoryStore().length, ...trimmed);
  await saveBlobReadings(trimmed);
}

async function getMongoPayload(): Promise<SensorPayload | null> {
  if (!process.env.MONGODB_URI) return null;

  await dbConnect();
  let readings = await SensorReading.find().sort({ timestamp: -1 }).limit(24);

  if (readings.length === 0) {
    await seedSensorHistory();
    readings = await SensorReading.find().sort({ timestamp: -1 }).limit(24);
  } else {
    const newest = readings[0];
    const ageMs = Date.now() - newest.timestamp.getTime();
    if (ageMs > 30 * 60 * 1000) {
      await appendSensorReading(newest.source);
      readings = await SensorReading.find().sort({ timestamp: -1 }).limit(24);
    }
  }

  return formatSensorPayload([...readings].reverse());
}

export async function getStoredSensorPayload(): Promise<SensorPayload> {
  try {
    const mongoPayload = await getMongoPayload();
    if (mongoPayload) return mongoPayload;
  } catch (error) {
    console.warn("MongoDB unavailable, using fallback sensor store:", error);
  }

  const readings = await loadFallbackReadings();
  const newest = readings[readings.length - 1];
  const ageMs = newest ? Date.now() - new Date(newest.timestamp).getTime() : Infinity;

  if (!newest || ageMs > 30 * 60 * 1000) {
    const generated = appendGeneratedReadingFromLatest(newest || null, newest?.source || "iot-simulator");
    readings.push({
      timestamp: generated.timestamp.toISOString(),
      temperature: generated.temperature,
      humidity: generated.humidity,
      ph: generated.ph,
      ec: generated.ec,
      light: generated.light,
      source: generated.source || "iot-simulator",
    });
    await saveFallbackReadings(readings);
  }

  return toPayload(readings.slice(-24));
}

export async function storeSensorReading(input: {
  temperature: number;
  humidity: number;
  ph: number;
  ec: number;
  light: number;
  source?: string;
}) {
  try {
    if (process.env.MONGODB_URI) {
      await dbConnect();
      await SensorReading.create({
        timestamp: new Date(),
        ...input,
        source: input.source || "hardware",
      });
      return;
    }
  } catch (error) {
    console.warn("MongoDB write failed, using fallback sensor store:", error);
  }

  const readings = await loadFallbackReadings();
  readings.push({
    timestamp: new Date().toISOString(),
    ...input,
    source: input.source || "hardware",
  });
  await saveFallbackReadings(readings);
}
