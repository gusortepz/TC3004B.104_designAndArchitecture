import { NextResponse } from 'next/server';
import { getAllPacientes, createPaciente } from '../../../../lib/model/paciente';

export async function GET() {
  try {
    const pacientes = await getAllPacientes();
    return NextResponse.json(pacientes);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener pacientes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const nuevoPaciente = await createPaciente({ name, rol: 'paciente' });
    return NextResponse.json(nuevoPaciente, { status: 201 });
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al crear el paciente' }, { status: 500 });
  }
}
