"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Medico = {
  id: number;
  name: string;
  especialidad: string;
  created_at: string;
};

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [name, setName] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  useEffect(() => {
    fetch("/api/medico")
      .then((res) => res.json())
      .then((data) => setMedicos(data))
      .catch((error) => console.error("Error fetching médicos:", error));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("/api/medico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, especialidad }),
    });

    if (response.ok) {
      const newMedico = await response.json();
      setMedicos([...medicos, newMedico]);
      setName("");
      setEspecialidad("");
    } else {
      console.error("Error creating médico");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Médicos</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          placeholder="Especialidad"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Agregar</button>
      </form>

      <ul className="border p-4">
        {medicos.map((medico) => (
          <li key={medico.id} className="p-2 border-b">
            <strong>{medico.name}</strong> - {medico.especialidad} <br />
            <small>Creado: {new Date(medico.created_at).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
      <Link href="/views">Return to Main Page</Link>
    </div>
  );
}
