import pool from "../db";
import { Usuario } from "./usuario";

export type Enfermera = Usuario & {
    
}


export async function createEnfermera(enfermera: Enfermera): Promise<Enfermera> {
  const query = `
    INSERT INTO usuarios (name, rol)
    VALUES ($1, $2)
    RETURNING id, name, rol, created_at
  `;
  const values = [enfermera.name, 'enfermera'];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getEnfermeraById(id: number): Promise<Enfermera | null> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE id = $1 AND rol = 'enfermera'`;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllEnfermeras(): Promise<Enfermera[]> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE rol = 'enfermera'`;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updateEnfermera(
  id: number,
  data: Partial<Pick<Enfermera, 'name'>>
): Promise<Enfermera | null> {
  const query = `UPDATE usuarios SET name = $1 WHERE id = $2 AND rol = 'enfermera' RETURNING id, name, rol, created_at`;
  const values = [data.name, id];
  const { rows } = await pool.query(query, values);
  return rows.length ? rows[0] : null;
}

export async function deleteEnfermera(id: number): Promise<boolean> {
  const query = `DELETE FROM usuarios WHERE id = $1 AND rol = 'enfermera'`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}
