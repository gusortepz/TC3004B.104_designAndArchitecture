"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EnfermerasPage() {
  const [enfermeras, setEnfermeras] = useState([]);
  const [name, setName] = useState("");

  // Fetch all enfermeras
  useEffect(() => {
    async function fetchEnfermeras() {
      const res = await fetch("/api/enfermera");
      const data = await res.json();
      setEnfermeras(data);
    }
    fetchEnfermeras();
  }, []);

  // Handle the creation of a new enfermera
  async function handleCreateEnfermera() {
    if (!name) return;
    
    const res = await fetch("/api/enfermera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const newEnfermera = await res.json();
      setEnfermeras([...enfermeras, newEnfermera]);
      setName(""); // Clear input
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Enfermeras</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Nombre de Enfermera"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateEnfermera} className="bg-green-500 text-white px-4 py-2">
          Agregar Enfermera
        </button>
      </div>

      <ul className="mt-5">
        {enfermeras.map((enfermera) => (
          <li key={enfermera.id} className="border-b py-2">{enfermera.name}</li>
        ))}
      </ul>
      <Link href="/views">Return to Main Page</Link>

    </div>
  );
}
