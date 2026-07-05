import SensorReading from "@/models/SensorReading";

type SensorKey = "temperature" | "humidity" | "ph" | "ec" | "light";

export type SensorPayload = {
  timestamps: string[];
  temperature: number[];
  humidity: number[];
  ph: number[];
  ec: number[];
  light: number[];
  latest: Record<SensorKey, number>;
  source: string;
  lastUpdated: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function readingAt(date: Date, indexFromEnd: number) {
  const hourOfDay = date.getHours();
  const temperature = clamp(
    22 + 3 * Math.sin((hourOfDay / 24) * 2 * Math.PI) + (Math.random() - 0.5),
    20,
    26
  );
  const humidity = clamp(
    65 - 10 * Math.sin((hourOfDay / 24) * 2 * Math.PI) + (Math.random() - 0.5) * 5,
    55,
    75
  );
  const ph = clamp(6.1 - 0.01 * indexFromEnd + (Math.random() - 0.5) * 0.1, 5.8, 6.5);
  const ec = clamp(1.6 + 0.005 * indexFromEnd + (Math.random() - 0.5) * 0.1, 1.2, 2.0);
  const light = clamp(
    Math.max(0, 15000 * Math.sin((hourOfDay / 24) * 2 * Math.PI * 0.8 + 0.5)) +
      (Math.random() - 0.5) * 1000,
    10000,
    20000
  );

  return { temperature, humidity, ph, ec, light };
}

function buildHistoryDocs(source = "iot-simulator") {
  const now = new Date();
  const docs = [];

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const values = readingAt(timestamp, i);
    docs.push({ timestamp, ...values, source });
  }

  return docs;
}

export async function seedSensorHistory(source = "iot-simulator") {
  const docs = buildHistoryDocs(source);
  await SensorReading.insertMany(docs);
  return docs;
}

export function generateSensorHistory(source = "iot-simulator") {
  return buildHistoryDocs(source);
}

export async function appendSensorReading(source = "iot-simulator") {
  const timestamp = new Date();
  const values = readingAt(timestamp, 0);

  try {
    const latest = await SensorReading.findOne().sort({ timestamp: -1 });
    if (latest) {
      values.temperature = clamp(latest.temperature + (Math.random() - 0.5) * 0.4, 20, 26);
      values.humidity = clamp(latest.humidity + (Math.random() - 0.5) * 2, 55, 75);
      values.ph = clamp(latest.ph + (Math.random() - 0.5) * 0.05, 5.8, 6.5);
      values.ec = clamp(latest.ec + (Math.random() - 0.5) * 0.05, 1.2, 2.0);
      values.light = clamp(latest.light + (Math.random() - 0.5) * 500, 0, 20000);
    }
    return SensorReading.create({ timestamp, ...values, source });
  } catch {
    return { timestamp, ...values, source };
  }
}

export function appendGeneratedReadingFromLatest(
  latest: {
    temperature: number;
    humidity: number;
    ph: number;
    ec: number;
    light: number;
    source?: string;
  } | null,
  source = "iot-simulator"
) {
  const timestamp = new Date();
  const values = readingAt(timestamp, 0);

  if (latest) {
    values.temperature = clamp(latest.temperature + (Math.random() - 0.5) * 0.4, 20, 26);
    values.humidity = clamp(latest.humidity + (Math.random() - 0.5) * 2, 55, 75);
    values.ph = clamp(latest.ph + (Math.random() - 0.5) * 0.05, 5.8, 6.5);
    values.ec = clamp(latest.ec + (Math.random() - 0.5) * 0.05, 1.2, 2.0);
    values.light = clamp(latest.light + (Math.random() - 0.5) * 500, 0, 20000);
  }

  return { timestamp, ...values, source: latest?.source || source };
}

export function formatSensorPayload(
  readings: Array<{
    timestamp: Date;
    temperature: number;
    humidity: number;
    ph: number;
    ec: number;
    light: number;
    source?: string;
  }>
): SensorPayload {
  const sorted = [...readings].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );
  const latest = sorted[sorted.length - 1];

  return {
    timestamps: sorted.map((entry) =>
      entry.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ),
    temperature: sorted.map((entry) => entry.temperature),
    humidity: sorted.map((entry) => entry.humidity),
    ph: sorted.map((entry) => entry.ph),
    ec: sorted.map((entry) => entry.ec),
    light: sorted.map((entry) => entry.light),
    latest: {
      temperature: latest.temperature,
      humidity: latest.humidity,
      ph: latest.ph,
      ec: latest.ec,
      light: latest.light,
    },
    source: latest.source || "iot-simulator",
    lastUpdated: latest.timestamp.toISOString(),
  };
}
