import { NextResponse } from 'next/server';
import { getCitaById, updateCita, deleteCita } from '../../../../../lib/model/cita';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cita = await getCitaById(Number(params.id));
    if (!cita) return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    return NextResponse.json(cita);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener la cita' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const citaActualizada = await updateCita(Number(params.id), body);
    return NextResponse.json(citaActualizada);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al actualizar la cita' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await deleteCita(Number(params.id));
    if (eliminado) {
      return NextResponse.json({ message: 'Cita eliminada' });
    } else {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al eliminar la cita' }, { status: 500 });
  }
}
