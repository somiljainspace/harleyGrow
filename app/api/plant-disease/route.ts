import { NextRequest, NextResponse } from "next/server";

const HF_MODEL = "Tharakados/Reezy-Plant-Disease";
const HF_API = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

const DISEASE_TIPS: Record<string, string[]> = {
  healthy: ["Plant looks healthy. Continue daily monitoring and balanced nutrients."],
  default: [
    "Remove infected leaves and dispose away from the grow area.",
    "Apply an appropriate fungicide or bactericide for the detected disease.",
    "Improve air circulation and avoid overhead watering.",
    "Monitor neighboring plants for early symptoms.",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided", success: false }, { status: 400 });
    }

    const token = process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_TOKEN;
    if (!token) {
      return NextResponse.json(
        {
          error: "Plant disease model is not configured. Add HUGGINGFACE_API_KEY in environment variables.",
          success: false,
        },
        { status: 503 }
      );
    }

    const buffer = Buffer.from(image, "base64");

    const response = await fetch(HF_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpeg",
      },
      body: buffer,
    });

    const hfResult = await response.json();

    if (!response.ok) {
      const message =
        typeof hfResult?.error === "string"
          ? hfResult.error
          : "Hugging Face model request failed";
      return NextResponse.json({ error: message, success: false }, { status: 502 });
    }

    if (!Array.isArray(hfResult) || !hfResult[0]?.label) {
      return NextResponse.json(
        { error: "Unexpected model response format", success: false },
        { status: 502 }
      );
    }

    const topLabel = hfResult[0];
    const confidence = topLabel.score || 0;
    const rawLabel = String(topLabel.label).replace(/__label__/i, "").replace(/_/g, " ");
    const disease = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
    const key = rawLabel.toLowerCase();
    const suggestions =
      key.includes("healthy") ? DISEASE_TIPS.healthy : DISEASE_TIPS.default;

    return NextResponse.json({
      disease,
      confidence: Math.round(confidence * 100) / 100,
      suggestions,
      source: "Hugging Face ML Model",
      success: true,
    });
  } catch (error) {
    console.error("ML Error:", error);
    return NextResponse.json(
      { error: "Prediction service unavailable", success: false },
      { status: 503 }
    );
  }
}
