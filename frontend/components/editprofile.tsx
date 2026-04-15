"use client";

import { Button } from "@/frontend/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import AvatarSelector from "./Avatarselector";
import { useState } from "react";

type EditProfileProps = {
  currentAvatar: string;
  onSave: (avatar: string) => void;
  onCancel: () => void;
};
export default function EditProfile({
  currentAvatar,
  onSave,
  onCancel,
}: EditProfileProps) {

  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  // 🔥 control segundo modal
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  return (
    <form className="rounded-xl border border-gray-100 shadow p-6">

      <h2 className="text-lg font-semibold mb-4">
        Editar información
      </h2>

      {/*Avatar como botón */}
      <div className="flex flex-col items-center mb-6">       
        <button
          type="button"
          onClick={() => setOpenAvatarModal(true)}
>
          <Avatar className="w-24 h-24 hover:scale-105 transition">
            <AvatarImage src={selectedAvatar} />
          </Avatar>
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Cambiar avatar
        </p>
      </div>
      {/* MODAL SECUNDARIO */}
      {openAvatarModal && (
        <AvatarSelector
          current={selectedAvatar}
          onSelect={setSelectedAvatar}
          onClose={() => setOpenAvatarModal(false)}
        />
      )}

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
        <Button
          type="button"
          variant="customgreen"
          onClick={() => onSave(selectedAvatar)}
      >
          Guardar cambios
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
      

    </form>

    
  );
}