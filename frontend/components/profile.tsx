"use client";
import { Field, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import EditProfile from "./editprofile";
import { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
          SG
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">Santiago Gallego</h1>
          <p className="text-gray-500">santiago@email.com</p>

          <div className="flex gap-2 justify-center md:justify-start mt-2">
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Adoptante
            </span>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
              Activo
            </span>
          </div>
        </div>

        {/* Acción */}
        <Button
          variant="customorange"
          onClick={() => setEditMode(true)}
        >
          Editar perfil
        </Button>

      </div>

            {/* MODAL */}
      {editMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setEditMode(false)}
          />

          {/* Contenido */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg z-10 animate-in fade-in zoom-in-95">

            {/* Botón cerrar */}
            <button
              onClick={() => setEditMode(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Formulario */}
            <EditProfile onCancel={() => setEditMode(false)} />
          </div>
        </div>
      )}
      
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold">2</p>
          <p className="text-sm text-gray-500">Adoptadas</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold">1</p>
          <p className="text-sm text-gray-500">En proceso</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold">5</p>
          <p className="text-sm text-gray-500">Favoritos</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-xl font-bold">12</p>
          <p className="text-sm text-gray-500">Visitas</p>
        </div>

      </div>

      <div>        
        {editMode && (
        <EditProfile onCancel={() => setEditMode(false)} />
        )}
      </div>

      {/* INFORMACIÓN PERSONAL */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Información personal
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-500">Nombre</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Santiago"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Correo</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="santiago@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Región</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Los Lagos"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Comuna</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Puerto Montt"
            />
          </div>

        <div>
            <label className="text-sm text-gray-500">Dirección</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Las lomas 1234"
            />
          </div>

          
        <div className="mb-4">
            <label className="text-sm text-gray-500">Código postal</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="5980000"
            />
          </div>


        </div>

        <div>
        <Field>
          <FieldLabel className="text-sm text-gray-500" htmlFor="textarea-message">Descripción</FieldLabel>
          <Textarea className="w-full mt-1 p-2 border rounded-lg" id="textarea-message" placeholder="Ingrese una breve descripción" />
        </Field>
        </div>


      </div>

    </div>
  );
}