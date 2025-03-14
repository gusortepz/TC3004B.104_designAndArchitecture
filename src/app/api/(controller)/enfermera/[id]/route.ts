// app/api/enfermera/[id]/route.ts
import { NextResponse } from 'next/server';
import { getEnfermeraById, updateEnfermera, deleteEnfermera } from '../../../../../lib/model/enfermera';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const enfermera = await getEnfermeraById(Number(params.id));
    if (!enfermera) return NextResponse.json({ error: 'Enfermera no encontrada' }, { status: 404 });
    return NextResponse.json(enfermera);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener la enfermera' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const enfermeraActualizada = await updateEnfermera(Number(params.id), body);
    return NextResponse.json(enfermeraActualizada);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al actualizar la enfermera' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await deleteEnfermera(Number(params.id));
    if (eliminado) {
      return NextResponse.json({ message: 'Enfermera eliminada' });
    } else {
      return NextResponse.json({ error: 'Enfermera no encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al eliminar la enfermera' }, { status: 500 });
  }
}
