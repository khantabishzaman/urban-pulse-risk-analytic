export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Urban Pulse
        </h1>

        <p className="max-w-2xl text-xl text-slate-300 mb-8">
         
          Urban Intelligence Platform for analyzing environmental,
          demographic and healthcare indicators to identify
          high-risk urban regions and support data-driven
          city planning.
        </p>

        <a
          href="/analytics"
          className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold hover:bg-blue-500"
        >
          Explore Dashboard
        </a>
      </section>
    </main>
  );
}