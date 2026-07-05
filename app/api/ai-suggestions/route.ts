import { NextResponse } from "next/server";
import { getStoredSensorPayload } from "@/lib/sensorStore";

const OPTIMAL = {
  temperature: [20, 26] as [number, number],
  humidity: [55, 75] as [number, number],
  ph: [5.8, 6.5] as [number, number],
  ec: [1.2, 2.0] as [number, number],
  light: [10000, 20000] as [number, number],
};

function outOfRange(value: number, [min, max]: [number, number]) {
  return value < min || value > max;
}

export async function GET() {
  try {
    const data = await getStoredSensorPayload();
    const latest = data.latest;
    const suggestions: string[] = [];

    if (outOfRange(latest.ph, OPTIMAL.ph)) {
      suggestions.push(
        latest.ph < OPTIMAL.ph[0]
          ? `pH is ${latest.ph.toFixed(1)} (low). Add pH-up solution gradually and retest in 30 minutes.`
          : `pH is ${latest.ph.toFixed(1)} (high). Add pH-down solution and monitor nutrient uptake.`
      );
    } else {
      suggestions.push(`pH ${latest.ph.toFixed(1)} is in the optimal hydroponic range [5.8–6.5].`);
    }

    if (outOfRange(latest.ec, OPTIMAL.ec)) {
      suggestions.push(
        latest.ec < OPTIMAL.ec[0]
          ? `EC is ${latest.ec.toFixed(1)} mS/cm (low). Increase nutrient concentration slightly.`
          : `EC is ${latest.ec.toFixed(1)} mS/cm (high). Dilute reservoir to avoid nutrient burn.`
      );
    } else {
      suggestions.push(`EC ${latest.ec.toFixed(1)} mS/cm supports steady vegetative growth.`);
    }

    if (outOfRange(latest.temperature, OPTIMAL.temperature)) {
      suggestions.push(
        latest.temperature < OPTIMAL.temperature[0]
          ? `Temperature is ${latest.temperature.toFixed(1)}°C. Increase grow-room heating or adjust lighting schedule.`
          : `Temperature is ${latest.temperature.toFixed(1)}°C. Improve ventilation to protect root zone health.`
      );
    } else {
      suggestions.push(
        `${latest.temperature.toFixed(1)}°C is ideal for root development and nutrient absorption.`
      );
    }

    if (outOfRange(latest.humidity, OPTIMAL.humidity)) {
      suggestions.push(
        latest.humidity > OPTIMAL.humidity[1]
          ? `Humidity is ${latest.humidity.toFixed(0)}%. Increase airflow to reduce mold risk.`
          : `Humidity is ${latest.humidity.toFixed(0)}%. Raise humidity with a humidifier to reduce plant stress.`
      );
    } else {
      suggestions.push(`Humidity ${latest.humidity.toFixed(0)}% is balanced for leafy crops.`);
    }

    if (latest.light < OPTIMAL.light[0]) {
      suggestions.push(
        `Light level is ${Math.round(latest.light)} lux. Extend LED hours or increase intensity for better photosynthesis.`
      );
    } else if (latest.light > OPTIMAL.light[1]) {
      suggestions.push(
        `Light level is ${Math.round(latest.light)} lux. Reduce intensity slightly to avoid leaf scorch.`
      );
    } else {
      suggestions.push(`Light at ${Math.round(latest.light)} lux is within the target range.`);
    }

    return NextResponse.json({
      suggestions,
      generatedAt: new Date().toISOString(),
      basedOn: latest,
      source: data.source,
    });
  } catch (error) {
    console.error("AI suggestions error:", error);
    return NextResponse.json({ error: "Unable to generate suggestions" }, { status: 503 });
  }
}
