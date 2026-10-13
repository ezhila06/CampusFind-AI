import Navbar from "@/components/Navbar";

interface Item {
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getItem(id: string): Promise<Item | null> {
  const res = await fetch(
    `http://localhost:3000/api/lost-items/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ItemPage({
  params,
}: PageProps) {
  const { id } = await params;

  const item = await getItem(id);

  if (!item) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center">
          <h1 className="text-3xl font-bold">
            Item Not Found
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-5xl px-6 py-12">

          <div className="grid gap-10 md:grid-cols-2">

            {item.imageUrl ? (
  <img
    src={item.imageUrl}
    alt={item.itemName}
    className="h-96 w-full rounded-3xl object-cover"
  />
) : (
  <div className="flex h-96 items-center justify-center rounded-3xl bg-slate-200">
    No Image
  </div>
)}

            <div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  item.status === "Lost"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>

              <h1 className="mt-6 text-5xl font-bold">
                {item.itemName}
              </h1>

              <p className="mt-6 text-lg text-slate-600">
                {item.description}
              </p>

              <div className="mt-8 space-y-4">

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <p>
                  <strong>Reported:</strong>{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>

          </div>

        </section>
      </main>
    </>
  );
}