"use client";
import { Field, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import EditProfile from "./editprofile";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState("/images/avatars/avatar1.png");
  
  
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
        {/* Avatar */}
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatar} />
          <AvatarFallback>SG</AvatarFallback>
        </Avatar>
        

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">Santiago Gallego</h1>
          <p className="text-gray-500">santiago@email.com</p>

          <div className="flex gap-2 justify-center md:justify-start mt-2">
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Adoptante
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
            <Button
              onClick={() => setEditMode(false)}
              variant="ghost"
              className="absolute top-4 right-4 rounded-full p-2 bg-red-500 text-white hover:bg-red-600"
            >
              ✕
            </Button>

            {/* Formulario */}
            <EditProfile
              currentAvatar={avatar}
              onSave={(newAvatar) => {
                setAvatar(newAvatar);
                setEditMode(false);
              }}
              onCancel={() => setEditMode(false)}
            />
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


      {/* INFORMACIÓN PERSONAL */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Información personal
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-500">Telefóno</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="+56 9 1234 5678"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Región</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Los Lagos"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Comuna</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Puerto Montt"
              readOnly
            />
          </div>

        <div>
            <label className="text-sm text-gray-500">Dirección</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Las lomas 1234"
              readOnly
            />
          </div>

        </div>

        <div className="mt-6">
        <Field>
          <FieldLabel className="text-sm text-gray-500" 
          htmlFor="descripcion">Descripción</FieldLabel>
          <Textarea className="w-full mt-1 p-2 border rounded-lg" 
            id="descripcion" 
            defaultValue="Amante de los animales, con experiencia en cuidado de perros y gatos. Siempre dispuesto a brindar un hogar amoroso a las mascotas que lo necesiten."
            readOnly />
        </Field>
        </div>


      </div>

    </div>
  );
}