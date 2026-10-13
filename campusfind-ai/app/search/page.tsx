"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/search/SearchBar";
import ItemCard from "@/components/search/ItemCard";

interface LostItem {
  _id: string;
  itemName: string;
  category: string;
  dateLost: string;
  location: string;
  description: string;
  imageUrl: string;
  status: "Lost" | "Found";
  createdAt: string;
}

export default function SearchPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/lost-items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-6 py-12">

          <h1 className="text-4xl font-bold text-slate-900">
            Search Lost & Found Items
          </h1>

          <p className="mt-3 text-slate-600">
            Search without logging in. Instantly browse items reported across campus.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-blue-600 px-5 py-2 text-white">
              All
            </button>

            <button className="rounded-full border px-5 py-2">
              Electronics
            </button>

            <button className="rounded-full border px-5 py-2">
              ID Cards
            </button>

            <button className="rounded-full border px-5 py-2">
              Wallets
            </button>

            <button className="rounded-full border px-5 py-2">
              Bags
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <p className="mt-10 text-center text-slate-500">
              Loading items...
            </p>
          )}

          {/* Empty State */}
          {!loading && items.length === 0 && (
            <p className="mt-10 text-center text-slate-500">
              No lost items have been reported yet.
            </p>
          )}

          {/* Item Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
  <ItemCard
    key={item._id}
    id={item._id}
    title={item.itemName}
    imageUrl={item.imageUrl}
    location={item.location}
    date={new Date(item.createdAt).toLocaleDateString()}
    status={item.status}
  />
))}
          </div>

        </section>
      </main>
    </>
  );
}