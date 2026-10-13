import { MapPin, Box } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
        <MapPin className="h-6 w-6 text-white" />
        <Box className="absolute h-3 w-3 text-white" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-900">
          CampusFind AI
        </h1>

        <p className="text-xs text-slate-500">
          Recover. Reconnect. Return.
        </p>
      </div>
    </div>
  );
}