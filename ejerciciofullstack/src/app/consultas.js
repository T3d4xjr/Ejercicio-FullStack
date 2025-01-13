"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";  
import Link from "next/link";

export default function Consultas() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contacto")
        .select("id, nombre, apellidos")
        .order("nombre", { ascending: true })
        .order("apellidos", { ascending: true });

      if (error) {
        console.error("Error al obtener los contactos:", error.message);
      } else {
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  const borrarContacto = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este contacto?");
    
    if (confirmDelete) {
      const { data, error } = await supabase
        .from("contacto")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al eliminar el contacto:", error.message);
      } else {
        setContacts(contacts.filter((contact) => contact.id !== id));
        alert("Contacto borrado con éxito.");
      }
    }
  };

  return (
    <div>
      <h1>Lista de Contactos</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link href={`/consultas/${contact.id}`}>
              {contact.nombre} {contact.apellidos}
            </Link>
            <button onClick={() => borrarContacto(contact.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
