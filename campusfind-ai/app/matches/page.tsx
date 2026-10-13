"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Match = {
  lost: {
    _id: string;
    itemName: string;
    category: string;
    location: string;
    description: string;
    imageUrl?: string;
    status: string;
  };
  found: {
    _id: string;
    itemName: string;
    category: string;
    location: string;
    description: string;
    imageUrl?: string;
    status: string;
  };
  score: {
    finalScore: number;
    nameScore: number;
    categoryScore: number;
    descriptionScore: number;
    locationScore: number;
  };
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/matches");

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();

        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load matches.");
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Possible Matches
          </h1>

          <p className="mt-2 text-slate-600">
            Potential matches between reported lost and found items.
          </p>

          {loading && (
            <div className="mt-10 rounded-xl bg-white p-6 shadow">
              Loading matches...
            </div>
          )}

          {error && (
            <div className="mt-10 rounded-xl bg-red-50 p-6 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && matches.length === 0 && (
            <div className="mt-10 rounded-xl bg-white p-6 shadow">
              No possible matches found.
            </div>
          )}

          <div className="mt-10 space-y-6">
            {matches.map((match, index) => (
              <div
                key={`${match.lost._id}-${match.found._id}-${index}`}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  
                  {/* Lost Item */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase text-red-600">
                      Lost Item
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      {match.lost.itemName}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      Category: {match.lost.category}
                    </p>

                    <p className="text-slate-600">
                      Location: {match.lost.location}
                    </p>

                    <p className="mt-2 text-slate-700">
                      {match.lost.description}
                    </p>

                    {match.lost.imageUrl && (
                      <img
                        src={match.lost.imageUrl}
                        alt={match.lost.itemName}
                        className="mt-4 h-40 w-full rounded-xl object-cover"
                      />
                    )}
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center justify-center rounded-xl bg-slate-100 p-6 md:w-48">
                    <p className="text-sm font-medium text-slate-600">
                      Match Score
                    </p>

                    <p className="mt-2 text-4xl font-bold text-blue-600">
                      {match.score.finalScore}
                    </p>

                    <p className="text-sm text-slate-500">
                      out of 100
                    </p>
                  </div>

                  {/* Found Item */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase text-green-600">
                      Found Item
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      {match.found.itemName}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      Category: {match.found.category}
                    </p>

                    <p className="text-slate-600">
                      Location: {match.found.location}
                    </p>

                    <p className="mt-2 text-slate-700">
                      {match.found.description}
                    </p>

                    {match.found.imageUrl && (
                      <img
                        src={match.found.imageUrl}
                        alt={match.found.itemName}
                        className="mt-4 h-40 w-full rounded-xl object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold text-slate-900">
                    Matching Details
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Score
                      label="Name"
                      value={match.score.nameScore}
                    />

                    <Score
                      label="Category"
                      value={match.score.categoryScore}
                    />

                    <Score
                      label="Location"
                      value={match.score.locationScore}
                    />

                    <Score
                      label="Description"
                      value={match.score.descriptionScore}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function Score({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-center">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}