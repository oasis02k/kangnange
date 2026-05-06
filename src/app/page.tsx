export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl" style={{ fontFamily: "var(--font-noto-sans-kr)" }}>
          Kangnange
        </h1>
        <p className="text-lg text-gray-500 max-w-sm">
          Something is coming. Stay tuned.
        </p>
        <a
          href="mailto:hello@kangnange.com"
          className="mt-4 inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </main>
  );
}
