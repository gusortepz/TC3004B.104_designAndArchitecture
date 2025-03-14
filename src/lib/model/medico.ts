import pool from "../db";
import { Usuario } from "./usuario";

export type Medico = Usuario & {
    especialidad: string;
}



export async function createMedico(medico: Medico): Promise<Medico> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const usuarioQuery = `
      INSERT INTO usuarios (name, rol)
      VALUES ($1, $2)
      RETURNING id, name, rol, created_at
    `;
    const usuarioValues = [medico.name, 'médico'];
    const { rows: usuarioRows } = await client.query(usuarioQuery, usuarioValues);
    const usuario = usuarioRows[0];
    const medicoQuery = `
      INSERT INTO medicos (usuario_id, especialidad)
      VALUES ($1, $2)
      RETURNING especialidad
    `;
    const medicoValues = [usuario.id, medico.especialidad];
    const { rows: medicoRows } = await client.query(medicoQuery, medicoValues);
    await client.query('COMMIT');
    return { ...usuario, especialidad: medicoRows[0].especialidad };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getMedicoById(id: number): Promise<Medico | null> {
  const query = `
    SELECT u.id, u.name, u.rol, u.created_at, m.especialidad
    FROM usuarios u
    JOIN medicos m ON u.id = m.usuario_id
    WHERE u.id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllMedicos(): Promise<Medico[]> {
  const query = `
    SELECT u.id, u.name, u.rol, u.created_at, m.especialidad
    FROM usuarios u
    JOIN medicos m ON u.id = m.usuario_id
    WHERE u.rol = 'médico'
  `;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updateMedico(
  id: number,
  data: Partial<Pick<Medico, 'name' | 'especialidad'>>
): Promise<Medico | null> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (data.name) {
      const usuarioUpdateQuery = `UPDATE usuarios SET name = $1 WHERE id = $2 RETURNING id, name, rol, created_at`;
      await client.query(usuarioUpdateQuery, [data.name, id]);
    }
    if (data.especialidad) {
      const medicoUpdateQuery = `UPDATE medicos SET especialidad = $1 WHERE usuario_id = $2`;
      await client.query(medicoUpdateQuery, [data.especialidad, id]);
    }
    await client.query('COMMIT');
    return getMedicoById(id);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteMedico(id: number): Promise<boolean> {
  const query = `DELETE FROM usuarios WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}