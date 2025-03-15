"use client";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Hospital Management</h1>
      <div className="mt-5">
        <button onClick={() => router.push("/views/medicos")} className="bg-blue-500 text-white px-4 py-2 mr-2">
          Ver Médicos
        </button>
        <button onClick={() => router.push("/views/pacientes")} className="bg-blue-500 text-white px-4 py-2 mr-2">
          Ver Pacientes
        </button>
        <button onClick={() => router.push("/views/enfermeras")} className="bg-blue-500 text-white px-4 py-2">
          Ver Enfermeras
        </button>
      </div>
    </div>
  );
}
