import Link from "next/link";


export default function Home() {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Administrador Hospital</h1>
      <Link
        href="/views"
        className="px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
      >
        Go to Views
      </Link>
    </div>
  );
}
