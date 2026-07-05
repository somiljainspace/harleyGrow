import { NextRequest, NextResponse } from "next/server";
import { getStoredSensorPayload, storeSensorReading } from "@/lib/sensorStore";

export async function GET() {
  try {
    const payload = await getStoredSensorPayload();
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Sensor GET error:", error);
    return NextResponse.json({ error: "Unable to load sensor data" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { temperature, humidity, ph, ec, light, source } = body;

    if (
      [temperature, humidity, ph, ec, light].some(
        (value) => typeof value !== "number" || Number.isNaN(value)
      )
    ) {
      return NextResponse.json(
        { error: "temperature, humidity, ph, ec, and light must be numbers" },
        { status: 400 }
      );
    }

    await storeSensorReading({
      temperature,
      humidity,
      ph,
      ec,
      light,
      source,
    });

    const payload = await getStoredSensorPayload();
    return NextResponse.json({ message: "Reading stored", ...payload }, { status: 201 });
  } catch (error) {
    console.error("Sensor POST error:", error);
    return NextResponse.json({ error: "Unable to store sensor data" }, { status: 503 });
  }
}
