import { NextResponse } from 'next/server';
import { getAdministradorById, updateAdministrador, deleteAdministrador } from '../../../../../lib/model/administrador';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getAdministradorById(Number(params.id));
    if (!admin) return NextResponse.json({ error: 'Administrador no encontrado' }, { status: 404 });
    return NextResponse.json(admin);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener el administrador' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const adminActualizado = await updateAdministrador(Number(params.id), body);
    return NextResponse.json(adminActualizado);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al actualizar el administrador' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eliminado = await deleteAdministrador(Number(params.id));
    if (eliminado) {
      return NextResponse.json({ message: 'Administrador eliminado' });
    } else {
      return NextResponse.json({ error: 'Administrador no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al eliminar el administrador' }, { status: 500 });
  }
}
