import { NextResponse } from 'next/server';
import { getAllEnfermeras, createEnfermera } from '../../../../lib/model/enfermera';

export async function GET() {
  try {
    const enfermeras = await getAllEnfermeras();
    return NextResponse.json(enfermeras);
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al obtener enfermeras' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const nuevaEnfermera = await createEnfermera({ name, rol: 'enfermera' });
    return NextResponse.json(nuevaEnfermera, { status: 201 });
  } catch (error) {
    console.error('Server error: ', error);
    return NextResponse.json({ error: 'Error al crear la enfermera' }, { status: 500 });
  }
}
