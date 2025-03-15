"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [citas, setCitas] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    async function fetchData() {
      const resPacientes = await fetch("/api/paciente");
      const resDoctores = await fetch("/api/medico");
      const pacientesData = await resPacientes.json();
      const doctoresData = await resDoctores.json();
      setPacientes(pacientesData);
      setDoctores(doctoresData);
    }
    fetchData();
  }, []);

  async function fetchCitas(pacienteId) {
    setSelectedPaciente(pacienteId);
    const res = await fetch(`/api/cita/${pacienteId}`);
    const data = await res.json();
    setCitas(data);
  }

  async function handleCreateCita() {
    if (!selectedPaciente || !selectedDoctor || !fecha || !hora || !motivo) return;

    const res = await fetch("/api/cita", {
      method: "POST",
      body: JSON.stringify({
        date: fecha,
        hour: hora,
        motive: motivo,
        patient_id: selectedPaciente,
        doctor_id: selectedDoctor,
        status: "pendiente",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetchCitas(selectedPaciente);
    }
  }

  async function handleUpdateCitaStatus(id, status) {
    const res = await fetch(`/api/cita/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetchCitas(selectedPaciente);
    }
  }

  async function handleAddPaciente() {
    const name = prompt("Enter paciente name:");
    if (!name) return;

    const res = await fetch("/api/paciente", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newPaciente = await res.json();
      setPacientes([...pacientes, newPaciente]);
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Pacientes</h1>
      <button onClick={handleAddPaciente} className="bg-green-500 text-white px-3 py-1 mb-3">
        Agregar Paciente
      </button>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id} className="border-b py-2 flex justify-between">
            <span>{paciente.name}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => fetchCitas(paciente.id)}
            >
              Ver citas
            </button>
          </li>
        ))}
      </ul>

      {selectedPaciente && (
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Citas</h2>
          <ul>
            {citas.map((cita) => (
              <li key={cita.id} className="border p-2 mt-2">
                <p><strong>Fecha:</strong> {cita.date}</p>
                <p><strong>Hora:</strong> {cita.hour}</p>
                <p><strong>Motivo:</strong> {cita.motive}</p>
                <p><strong>Doctor:</strong> {cita.doctor_id}</p>
                <p><strong>Estado:</strong> {cita.status}</p>
                <div className="mt-2">
                  <button onClick={() => handleUpdateCitaStatus(cita.id, "confirmada")} className="bg-green-500 text-white px-2 py-1 mr-2">
                    Confirmar
                  </button>
                  <button onClick={() => handleUpdateCitaStatus(cita.id, "cancelada")} className="bg-red-500 text-white px-2 py-1">
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-4">Crear Nueva Cita</h3>
          <select onChange={(e) => setSelectedDoctor(e.target.value)} className="border p-2">
            <option value="">Seleccionar Doctor</option>
            {doctores.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input type="date" onChange={(e) => setFecha(e.target.value)} className="border p-2 ml-2" />
          <input type="time" onChange={(e) => setHora(e.target.value)} className="border p-2 ml-2" />
          <input type="text" placeholder="Motivo" onChange={(e) => setMotivo(e.target.value)} className="border p-2 ml-2" />
          <button onClick={handleCreateCita} className="bg-green-500 text-white px-3 py-1 ml-2">
            Crear Cita
          </button>
        </div>
      )}
      <Link href="/views">Return to Main Page</Link>
    </div>
  );
}
