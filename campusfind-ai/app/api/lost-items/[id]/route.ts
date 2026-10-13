import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LostItem from "@/models/LostItem";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid item ID" },
        { status: 400 }
      );
    }

    const item = await LostItem.findById(id);

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}