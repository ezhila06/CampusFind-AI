import fs from "fs";
import { downloadImage } from "@/lib/ai/downloadImage";
import { detectObjects } from "@/lib/ai/detect";
import { extractText } from "@/lib/ai/ocr";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LostItem from "@/models/LostItem";

export async function GET() {
  try {
    await connectDB();

    const items = await LostItem.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch items",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    let aiTags: string[] = [];

    let aiDetections: {
      label: string;
      confidence: number;
    }[] = [];

    let ocrText = "";

    if (body.imageUrl) {
      let tempImage = "";

      try {
        console.log("Cloudinary URL:", body.imageUrl);

        // Download image from Cloudinary
        tempImage = await downloadImage(body.imageUrl);

        console.log("Downloaded image:", tempImage);

        // =========================
        // YOLO OBJECT DETECTION
        // =========================

        const detections = await detectObjects(tempImage);

        console.log("YOLO detections:", detections);

        aiDetections = detections;

        aiTags = detections.map(
          (d) => d.label
        );

        // Remove duplicate tags
        aiTags = [...new Set(aiTags)];

        console.log("AI Tags:", aiTags);

        // =========================
        // OCR TEXT EXTRACTION
        // =========================

        const ocrResults = await extractText(
          tempImage
        );

        console.log(
          "OCR results:",
          ocrResults
        );

        ocrText = ocrResults
          .map((item) => item.text)
          .join(" ");

        console.log(
          "OCR Text:",
          ocrText
        );
      } catch (err) {
        console.error(
          "AI Processing Failed:",
          err
        );
      } finally {
        // Delete temporary image
        if (
          tempImage &&
          fs.existsSync(tempImage)
        ) {
          fs.unlinkSync(tempImage);
        }
      }
    }

    // =========================
    // VALIDATION
    // =========================

    if (
      !body.itemName ||
      !body.category ||
      !body.location ||
      !body.description ||
      !body.dateLost
    ) {
      return NextResponse.json(
        {
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // SAVE TO MONGODB
    // =========================

    const item = await LostItem.create({
      itemName: body.itemName,
      category: body.category,
      dateLost: body.dateLost,
      location: body.location,
      description: body.description,
      imageUrl: body.imageUrl || "",

      aiTags,
      aiDetections,
      ocrText,

      status: body.status || "Lost",
    });

    return NextResponse.json(item, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to save item.",
      },
      {
        status: 500,
      }
    );
  }
}