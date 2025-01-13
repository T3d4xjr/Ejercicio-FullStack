"use client"
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Contactos</h1>
      <nav>
        <ul>
          <li>
            <Link href="/añadirContacto">Añadir Contacto</Link>
          </li>
          <li>
            <Link href="/consultas">Ver Contactos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
