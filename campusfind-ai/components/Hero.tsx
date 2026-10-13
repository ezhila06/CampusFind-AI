import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import Illustration from "./Illustration";

export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-6 py-20 lg:flex-row">

        {/* Left Side */}
        <div className="flex-1">

          <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Recover. Reconnect. Return.
          </span>

        <h1 className="mt-8 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">            Recover Lost
            <br />
            Items Powered
            <br />
            by AI.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            CampusFind AI helps students recover lost belongings
            using Computer Vision, OCR, AI matching,
            and secure verification.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link href="/report-lost">
  <Button size="lg">
    Report Lost Item
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</Link>

            <Link href="/report-found">
  <Button variant="outline" size="lg">
    <Search className="mr-2 h-5 w-5" />
    Browse Found Items
  </Button>
</Link>

          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-600">
          <div className="mt-4">
  <Link href="/matches">
    <Button variant="outline">
      View Possible Matches
    </Button>
  </Link>
</div>

            <div className="flex items-center gap-2">
              <ScanSearch className="h-5 w-5 text-blue-600" />
              YOLO Detection
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Secure Claims
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex-1">
          <Illustration />
        </div>

      </div>
    </section>
  );
}