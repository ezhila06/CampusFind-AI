"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadBox from "@/components/report/UploadBox";
import { Button } from "@/components/ui/button";

export default function ReportFoundPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    dateLost: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({
          ...formData,
          status: "Found",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Found item reported successfully!");

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
            Report Found Item
          </h1>

          <p className="mt-2 text-slate-600">
            Help someone recover their lost belongings.
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
                placeholder="Black Water Bottle"
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
                  Date Found
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
                Found Location
              </label>

              <input
                type="text"
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
                className="w-full rounded-xl border border-slate-300 p-3"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Submitting..."
                : "Report Found Item"}
            </Button>

          </form>

        </section>
      </main>
    </>
  );
}