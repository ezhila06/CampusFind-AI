import {
  ScanSearch,
  ScanText,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "YOLO Object Detection",
    description:
      "Automatically detects laptops, wallets, bottles, ID cards, keys, bags and more from uploaded images.",
  },
  {
    icon: ScanText,
    title: "OCR Recognition",
    description:
      "Reads names, roll numbers, book titles, labels and other visible text from images.",
  },
  {
    icon: BrainCircuit,
    title: "AI Matching Engine",
    description:
      "Combines image analysis, OCR and descriptions to intelligently match lost and found items.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Claim Verification",
    description:
      "Protects users with secure ownership verification before handing over valuable belongings.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Intelligent Features
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Modern AI technologies that make finding lost belongings faster and safer.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}