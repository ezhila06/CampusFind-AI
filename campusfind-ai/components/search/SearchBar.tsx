import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />

      <input
        type="text"
        placeholder="Search by item name, category or location..."
        className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}