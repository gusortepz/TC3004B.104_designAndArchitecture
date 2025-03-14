import pool from "../db";

export type Usuario = {
    id?: number;
    name: string;
    rol: UsuarioRol;
    created_at?: Date;
}

type UsuarioRol = 'administrador' | 'médico' | 'paciente' | 'enfermera';




export async function createUsuario(usuario: Omit<Usuario, 'id' | 'created_at'>): Promise<Usuario> {
  const query = `
    INSERT INTO usuarios (name, rol)
    VALUES ($1, $2)
    RETURNING id, name, rol, created_at
  `;
  const values = [usuario.name, usuario.rol];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getUsuarioById(id: number): Promise<Usuario | null> {
  const query = `SELECT id, name, rol, created_at FROM usuarios WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllUsuarios(): Promise<Usuario[]> {
  const query = `SELECT id, name, rol, created_at FROM usuarios`;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updateUsuario(
  id: number,
  usuario: Partial<Omit<Usuario, 'id' | 'created_at'>>
): Promise<Usuario | null> {
  const fields = [];
  const values: (string | number)[] = [];
  let i = 1;

  if (usuario.name) {
    fields.push(`name = $${i}`);
    values.push(usuario.name);
    i++;
  }
  if (usuario.rol) {
    fields.push(`rol = $${i}`);
    values.push(usuario.rol);
    i++;
  }
  if (fields.length === 0) return await getUsuarioById(id);
  const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, name, rol, created_at`;
  values.push(id);
  const { rows } = await pool.query(query, values);
  return rows.length ? rows[0] : null;
}

export async function deleteUsuario(id: number): Promise<boolean> {
  const query = `DELETE FROM usuarios WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}
