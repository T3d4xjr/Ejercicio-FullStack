"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from './supabase';

export default function ContactDetail() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useRouter(); 
  const { id } = query; 

  useEffect(() => {
    const fetchContact = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("contacto")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error al obtener el contacto:", error.message);
        } else {
          setContact(data);
        }
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!contact) {
    return <div>Contacto no encontrado.</div>;
  }

  return (
    <div>
      <h1>Detalles del Contacto</h1>
      <p><strong>Nombre:</strong> {contact.nombre}</p>
      <p><strong>Apellidos:</strong> {contact.apellidos}</p>
      <p><strong>Correo:</strong> {contact.correo}</p>
      <p><strong>Teléfono:</strong> {contact.telefono}</p>
      <p><strong>Fecha de Nacimiento:</strong> {contact.fecha_nacimiento}</p>
    </div>
  );
}
