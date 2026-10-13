import {
  Laptop,
  KeyRound,
  Wallet,
  CreditCard,
  ScanSearch,
} from "lucide-react";

export default function Illustration() {
  return (
    <div className="relative flex h-[500px] items-center justify-center">

      <div className="absolute top-8 left-10 rounded-2xl bg-white p-5 shadow-xl">
        <Laptop className="h-10 w-10 text-blue-600" />
      </div>

      <div className="absolute top-16 right-12 rounded-2xl bg-white p-5 shadow-xl">
        <Wallet className="h-10 w-10 text-emerald-600" />
      </div>

      <div className="absolute bottom-20 left-12 rounded-2xl bg-white p-5 shadow-xl">
        <KeyRound className="h-10 w-10 text-amber-500" />
      </div>

      <div className="absolute bottom-10 right-10 rounded-2xl bg-white p-5 shadow-xl">
        <CreditCard className="h-10 w-10 text-purple-600" />
      </div>

      <div className="flex h-44 w-44 items-center justify-center rounded-full bg-blue-600 shadow-2xl">
        <ScanSearch className="h-20 w-20 text-white" />
      </div>

    </div>
  );
}