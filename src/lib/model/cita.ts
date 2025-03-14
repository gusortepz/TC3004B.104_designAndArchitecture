import pool from "../db";

export type Cita = {
    id: number;
    date: Date;
    hour: string;
    motive: string;
    patient_id: number;
    doctor_id: number;
    status: CitaStatus;
    created_at: Date;
}

type CitaStatus = 'confirmada' | 'cancelada' | 'pendiente';



export async function createCita(cita: Omit<Cita, 'id' | 'created_at'>): Promise<Cita> {
  const query = `
    INSERT INTO citas (date, hour, motive, patient_id, doctor_id, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, date, hour, motive, patient_id, doctor_id, status, created_at
  `;
  const values = [cita.date, cita.hour, cita.motive, cita.patient_id, cita.doctor_id, cita.status];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getCitaById(id: number): Promise<Cita | null> {
  const query = `SELECT id, date, hour, motive, patient_id, doctor_id, status, created_at FROM citas WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
}

export async function getAllCitas(): Promise<Cita[]> {
  const query = `SELECT id, date, hour, motive, patient_id, doctor_id, status, created_at FROM citas`;
  const { rows } = await pool.query(query);
  return rows;
}

export async function updateCita(
  id: number,
  data: Partial<Omit<Cita, 'id' | 'created_at'>>
): Promise<Cita | null> {
  const fields = [];
  const values: (Date | string | number)[] = [];
  let i = 1;
  
  if (data.date) {
    fields.push(`date = $${i}`);
    values.push(data.date);
    i++;
  }
  if (data.hour) {
    fields.push(`hour = $${i}`);
    values.push(data.hour);
    i++;
  }
  if (data.motive) {
    fields.push(`motive = $${i}`);
    values.push(data.motive);
    i++;
  }
  if (data.patient_id) {
    fields.push(`patient_id = $${i}`);
    values.push(data.patient_id);
    i++;
  }
  if (data.doctor_id) {
    fields.push(`doctor_id = $${i}`);
    values.push(data.doctor_id);
    i++;
  }
  if (data.status) {
    fields.push(`status = $${i}`);
    values.push(data.status);
    i++;
  }
  if (fields.length === 0) return await getCitaById(id);
  const query = `UPDATE citas SET ${fields.join(', ')} WHERE id = $${i} RETURNING id, date, hour, motive, patient_id, doctor_id, status, created_at`;
  values.push(id);
  const { rows } = await pool.query(query, values);
  return rows.length ? rows[0] : null;
}

export async function deleteCita(id: number): Promise<boolean> {
  const query = `DELETE FROM citas WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}