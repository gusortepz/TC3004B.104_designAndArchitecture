import { NextResponse } from 'next/server';
import { getAllMedicos, createMedico } from '../../../../lib/model/medico';

export async function GET() {
  try {
    const medicos = await getAllMedicos();
    return NextResponse.json(medicos);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener los médicos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, especialidad } = await request.json();
    const nuevoMedico = await createMedico({ name, especialidad, rol: 'médico' });
    return NextResponse.json(nuevoMedico, { status: 201 });
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al crear el médico' }, { status: 500 });
  }
}
