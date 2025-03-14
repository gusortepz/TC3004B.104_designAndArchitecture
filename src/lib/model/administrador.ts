import pool from "../db";
import { Usuario } from "./usuario";

export type Administrador = Usuario & {
    
}



export async function createAdministrador(admin: Administrador): Promise<Administrador> {
  const query = `
    INSERT INTO usuarios (name, rol)
    VALUES ($1, $2)
    RETURNING id, name, rol, created_at
  `;
  const values = [admin.name, 'administrador'];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getAdministradorById(id: number): Promise<Administrador | null> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE id = $1 AND rol = 'administrador'`;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllAdministradores(): Promise<Administrador[]> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE rol = 'administrador'`;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updateAdministrador(
  id: number,
  data: Partial<Pick<Administrador, 'name'>>
): Promise<Administrador | null> {
  const query = `UPDATE usuarios SET name = $1 WHERE id = $2 AND rol = 'administrador' RETURNING id, name, rol, created_at`;
  const values = [data.name, id];
  const { rows } = await pool.query(query, values);
  return rows.length ? rows[0] : null;
}

export async function deleteAdministrador(id: number): Promise<boolean> {
  const query = `DELETE FROM usuarios WHERE id = $1 AND rol = 'administrador'`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}
