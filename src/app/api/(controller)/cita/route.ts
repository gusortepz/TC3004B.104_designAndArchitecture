import { NextResponse } from 'next/server';
import { getAllCitas, createCita } from '../../../../lib/model/cita';

export async function GET() {
  try {
    const citas = await getAllCitas();
    return NextResponse.json(citas);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener las citas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { date, hour, motive, patient_id, doctor_id, status } = await request.json();
    const nuevaCita = await createCita({ date, hour, motive, patient_id, doctor_id, status });
    return NextResponse.json(nuevaCita, { status: 201 });
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al crear la cita' }, { status: 500 });
  }
}
