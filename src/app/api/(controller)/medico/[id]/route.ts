import { NextResponse } from 'next/server';
import { getMedicoById, updateMedico, deleteMedico } from '../../../../../lib/model/medico';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const medico = await getMedicoById(Number(params.id));
    if (!medico) return NextResponse.json({ error: 'Médico no encontrado' }, { status: 404 });
    return NextResponse.json(medico);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener el médico' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const medicoActualizado = await updateMedico(Number(params.id), body);
    return NextResponse.json(medicoActualizado);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al actualizar el médico' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await deleteMedico(Number(params.id));
    if (eliminado) {
      return NextResponse.json({ message: 'Médico eliminado' });
    } else {
      return NextResponse.json({ error: 'Médico no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al eliminar el médico' }, { status: 500 });
  }
}
