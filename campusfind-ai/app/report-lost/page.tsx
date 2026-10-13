"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadBox from "@/components/report/UploadBox";
import { Button } from "@/components/ui/button";

export default function ReportLostPage() {
  const [formData, setFormData] = useState({
  itemName: "",
  category: "",
  dateLost: "",
  location: "",
  description: "",
  imageUrl: "",
});

  const [loading, setLoading] = useState(false);
  const [aiDetections, setAiDetections] = useState<
  { label: string; confidence: number }[]
>([]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.itemName ||
      !formData.category ||
      !formData.dateLost ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/lost-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setAiDetections(data.aiDetections || []);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Lost item reported successfully!");

      setFormData({
        itemName: "",
        category: "",
        dateLost: "",
        location: "",
        description: "",
        imageUrl: "",
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-6 py-12">

          <h1 className="text-4xl font-bold">
            Report Lost Item
          </h1>

          <p className="mt-2 text-slate-600">
            Fill in the details below.
          </p>

          <div className="mt-10">
            <UploadBox
  onUpload={(url) =>
    setFormData({
      ...formData,
      imageUrl: url,
    })
  }
/>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>
              <label className="mb-2 block font-medium">
                Item Name
              </label>

              <input
                type="text"
                placeholder="Black Dell Laptop"
                value={formData.itemName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    itemName: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 p-3"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3"
                >
                  <option value="">Select Category</option>
                  <option>Electronics</option>
                  <option>ID Card</option>
                  <option>Wallet</option>
                  <option>Keys</option>
                  <option>Bag</option>
                  <option>Books</option>
                  <option>Others</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Date Lost
                </label>

                <input
                  type="date"
                  value={formData.dateLost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateLost: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Last Seen Location
              </label>

              <input
                type="text"
                placeholder="Library, Block A..."
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the lost item..."
                className="w-full rounded-xl border border-slate-300 p-3"
              />

            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>

          </form>
          {aiDetections.length > 0 && (
  <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
    <h2 className="text-xl font-semibold text-slate-900">
      AI Image Analysis
    </h2>

    <div className="mt-4 space-y-3">
      {aiDetections.map((detection, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl bg-white p-3"
        >
          <span className="font-medium capitalize">
            {detection.label}
          </span>

          <span className="text-blue-600">
            {(detection.confidence * 100).toFixed(0)}% confidence
          </span>
        </div>
      ))}
    </div>
  </div>
)}

        </section>
      </main>
    </>
  );
}