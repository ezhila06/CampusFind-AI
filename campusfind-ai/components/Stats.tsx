export default function Stats() {
  const stats = [
    {
      number: "98%",
      title: "AI Match Accuracy",
    },
    {
      number: "5000+",
      title: "Items Returned",
    },
    {
      number: "<5 sec",
      title: "Average Match Time",
    },
    {
      number: "24/7",
      title: "Availability",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm transition hover:shadow-lg"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {stat.number}
            </h2>

            <p className="mt-3 text-slate-600">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}