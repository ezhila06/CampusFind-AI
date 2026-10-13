import { NextResponse } from "next/server";
import path from "path";
import { detectObjects } from "@/lib/ai/detect";

export async function GET() {
  try {
    const imagePath = path.join(
      process.cwd(),
      "ai",
      "yolo",
      "images",
      "test.jpg"
    );

    const result = await detectObjects(imagePath);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}