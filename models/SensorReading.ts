import mongoose from "mongoose";

const SensorReadingSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, index: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  ph: { type: Number, required: true },
  ec: { type: Number, required: true },
  light: { type: Number, required: true },
  source: { type: String, default: "iot-simulator" },
});

export default mongoose.models.SensorReading ||
  mongoose.model("SensorReading", SensorReadingSchema);
