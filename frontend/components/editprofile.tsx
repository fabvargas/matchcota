"use client";

import { Button } from "@/frontend/components/ui/button";

export default function EditProfile({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <form className="rounded-xl border border-gray-100 shadow p-6">

      <h2 className="text-lg font-semibold mb-4">
        Editar información
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

        <div>
          <label className="text-sm text-gray-500">Código postal</label>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            defaultValue="5980000"
          />
        </div>

      </div>

      
        <div>
            <label className="text-sm text-gray-500">Descripción</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue="Amante de los animales, con experiencia en cuidado de mascotas."
            />
          </div>

      <div className="mt-4 flex gap-2">
        <Button variant="customgreen">
          Guardar cambios
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
      

    </form>

    
  );
}