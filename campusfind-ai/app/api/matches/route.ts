import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LostItem from "@/models/LostItem";
import { calculateMatchScore } from "@/lib/matcher";

export async function GET() {
  try {
    await connectDB();

    const lostItems = await LostItem.find({
      status: "Lost",
    });

    const foundItems = await LostItem.find({
      status: "Found",
    });

    const matches = [];

    for (const lost of lostItems) {
      for (const found of foundItems) {

        const score = calculateMatchScore(
          {
            itemName: lost.itemName,
            category: lost.category,
            location: lost.location,
            description: lost.description,
          },
          {
            itemName: found.itemName,
            category: found.category,
            location: found.location,
            description: found.description,
          }
        );

        if (score.finalScore >= 60) {
          matches.push({
            lost,
            found,
            score,
          });
        }
      }
    }

    matches.sort(
      (a, b) => b.score.finalScore - a.score.finalScore
    );

    return NextResponse.json(matches);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to calculate matches",
      },
      {
        status: 500,
      }
    );
  }
}