// src/app/api/test/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Just get the collections list
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: "✅ Connected to MongoDB!",
      collections,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "❌ Failed to connect", error },
      { status: 500 }
    );
  }
}
