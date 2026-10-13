import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

interface ItemCardProps {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  status: "Lost" | "Found";
}

export default function ItemCard({
  id,
  title,
  imageUrl,
  location,
  date,
  status,
}: ItemCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 items-center justify-center bg-slate-100">
          No Image
        </div>
      )}

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              status === "Lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>

        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          {location}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} />
          {date}
        </div>

        <Link
          href={`/item/${id}`}
          className="mt-6 flex items-center gap-2 font-medium text-blue-600"
        >
          View Details
          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
}