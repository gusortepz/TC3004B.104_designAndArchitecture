import { NextResponse } from 'next/server';
import { getPacienteById, updatePaciente, deletePaciente } from '../../../../../lib/model/paciente';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const paciente = await getPacienteById(Number(params.id));
    if (!paciente) return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    return NextResponse.json(paciente);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener el paciente' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const pacienteActualizado = await updatePaciente(Number(params.id), body);
    return NextResponse.json(pacienteActualizado);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al actualizar el paciente' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await deletePaciente(Number(params.id));
    if (eliminado) {
      return NextResponse.json({ message: 'Paciente eliminado' });
    } else {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al eliminar el paciente' }, { status: 500 });
  }
}
