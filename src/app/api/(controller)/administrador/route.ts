import { NextResponse } from 'next/server';
import { getAllAdministradores, createAdministrador } from '../../../../lib/model/administrador';

export async function GET() {
  try {
    const admins = await getAllAdministradores();
    return NextResponse.json(admins);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener administradores' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const nuevoAdmin = await createAdministrador({ name, rol: 'administrador' });
    return NextResponse.json(nuevoAdmin, { status: 201 });
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al crear el administrador' }, { status: 500 });
  }
}
