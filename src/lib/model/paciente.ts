import pool from "../db";
import { Usuario } from "./usuario";

export type Paciente = Usuario & {
    
}



export async function createPaciente(paciente: Paciente): Promise<Paciente> {
  const query = `
    INSERT INTO usuarios (name, rol)
    VALUES ($1, $2)
    RETURNING id, name, rol, created_at
  `;
  const values = [paciente.name, 'paciente'];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getPacienteById(id: number): Promise<Paciente | null> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE id = $1 AND rol = 'paciente'`;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllPacientes(): Promise<Paciente[]> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE rol = 'paciente'`;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updatePaciente(
  id: number,
  data: Partial<Pick<Paciente, 'name'>>
): Promise<Paciente | null> {
  const query = `UPDATE usuarios SET name = $1 WHERE id = $2 AND rol = 'paciente' RETURNING id, name, rol, created_at`;
  const values = [data.name, id];
  const { rows } = await pool.query(query, values);
  return rows.length ? rows[0] : null;
}

export async function deletePaciente(id: number): Promise<boolean> {
  const query = `DELETE FROM usuarios WHERE id = $1 AND rol = 'paciente'`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}