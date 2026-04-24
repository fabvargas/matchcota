"use client";

import { Button } from "@/frontend/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import AvatarSelector from "./Avatarselector";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import {regionOptions, comunaOptions} from "@/frontend/lib/regionOptions";
import { useSubmitForm } from "../hooks/useSubmitForm";
import  UpdateUserProfileAction  from "@/app/controller/profile/UpdateUserProfileAction";
import  { UserProfileType } from "@/frontend/type"



type EditProfileProps = {
  currentAvatar: string;
  onCancel: () => void;
  profile?: UserProfileType;
};
export default function EditProfile({
  currentAvatar,
  onCancel,
  profile,
}: EditProfileProps) {


  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const regionData=regionOptions;
  const comunaData=comunaOptions;
const [selectedRegion, setSelectedRegion] = useState<string | null>(profile?.region || null);
const [selectedComuna, setSelectedComuna] = useState<string | null>(profile?.comuna || null);
const {state, isPending, handleSubmit } = useSubmitForm(UpdateUserProfileAction, {error: false, message: "", data: undefined});
const comunas = selectedRegion
  ? comunaData[selectedRegion as keyof typeof comunaData] || []
  : [];

  // 🔥 control segundo modal
  const [openAvatarModal, setOpenAvatarModal] = useState(false);



  return (
    <form className=" " 
      onSubmit={handleSubmit}
      >

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
            defaultValue={profile?.name}
            name="name"
          />
        </div>

             <div>
          <label className="text-sm text-gray-500">Teléfono</label>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            defaultValue={profile?.telephone}
            name="telephone"
          />
        </div>

      

      <div>
      <label className="text-sm text-gray-500">Región</label>
      <CustomSelect
        items={regionData}
        value={selectedRegion ?? undefined}
        onChange={(value) => {
          setSelectedRegion(value);
          setSelectedComuna(null); // reset comuna
        }}
        name="region"
      />
    </div>

    <div>
      <label className="text-sm text-gray-500">Comuna</label>
      <CustomSelect
        items={comunas}
        name="comuna"
        value={selectedComuna ?? undefined}
        onChange={setSelectedComuna}
        disabled={!selectedRegion}
        placeholder={
          selectedRegion
            ? "Selecciona comuna"
            : "Primero selecciona región"
        }
      />
    </div>

        <div>
          <label className="text-sm text-gray-500">Dirección</label>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            defaultValue={profile?.address }
            name="address"
          />
        </div>


      </div>

      
        <div>
            <label className="text-sm text-gray-500">Descripción</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg"
              defaultValue={profile?.description }
              name="description"
            />
          </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="submit"
          variant="customgreen"

      >
         {isPending ? "Guardando..." : "Guardar Cambios"}

        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
      
      {state.error && (
        <p className="text-red-500 mt-2">
          {state.message || "Error al actualizar el perfil"}
        </p>
      )}
      {state.message && !state.error && (
        <p className="text-green-500 mt-2">
          {state.message}
        </p>
      )}
   

    </form>

    
  );
}