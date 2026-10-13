import mongoose, { Schema } from "mongoose";

const LostItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    dateLost: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    aiTags: {
      type: [String],
      default: [],
    },

    aiDetections: {
      type: [
        {
          label: String,
          confidence: Number,
        },
      ],
      default: [],
    },

    ocrText: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      
      default: "Lost",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LostItem ||
  mongoose.model("LostItem", LostItemSchema);