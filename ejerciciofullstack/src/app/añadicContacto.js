"use client";
import React, { useState } from 'react';
import { supabase } from './supabase';

export default function añadirContacto() {
  const [formData, setFormData] = useState({
    nombre: '', 
    apellidos: '', 
    correo: '', 
    telefono: '', 
    fecha_nacimiento: '', 
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('contacto').insert([formData]);

    if (error) {
      console.error('Error al añadir el contacto', error.message);
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Contacto añadido con éxito.');
      setTimeout(() => {
        // Esto redirige manualmente (aún sin router)
        window.location.href = '/contacts'; // Cambiar a la vista de la lista de contactos
      }, 2000);
    }
  };

  return (
    <div>
      <h1>Añadir Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Apellidos:
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Añadir Contacto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
