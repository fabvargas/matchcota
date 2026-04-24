"use client";
import { Field, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import EditProfile from "./editprofile";
import {  useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/frontend/components/ui/dialog";
import { UserProfileType } from "@/frontend/type";




export default function Profile({profile}: {profile: UserProfileType}) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState("/images/avatars/avatar1.png");
  


    const data = {
    name: profile.name || "Nombre no disponible",
    email: profile.email || "Email no disponible",
    role: profile.role || "Rol no disponible",
    telephone: profile.telephone || "Teléfono no disponible",
    region: profile.region || "Región no disponible",
    comuna: profile.comuna || "Comuna no disponible",
    address: profile.address || "Dirección no disponible",
    description: profile.description || "Descripción no disponible",
    }

    

  return (
    <div className="space-y-6 mx-auto w-full  max-w-5xl ">

     {/* HEADER */}
      <div className="rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 bg-white">


        <Avatar className="w-24 h-24">
          <AvatarImage src={avatar} />
          <AvatarFallback>SG</AvatarFallback>
        </Avatar>


        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-gray-500">{data.email}</p>

          <div className="flex gap-2 justify-center md:justify-start mt-2">
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">

              {data.role}

            </span>
          </div>
        </div>

        {/* DIALOG */}
        <Dialog open={editMode} onOpenChange={setEditMode} >
          <DialogTrigger asChild>
            <Button variant="customorange">
              Editar perfil
            </Button>
          </DialogTrigger>

          <DialogContent
          className="w-full "
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>
                Editar perfil
              </DialogTitle>
            </DialogHeader>

            <EditProfile
              currentAvatar={avatar}
                profile={profile}
              onCancel={() => setEditMode(false)}
            />
          </DialogContent>
        </Dialog>

      </div>

      
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
              defaultValue={data.telephone}

              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Región</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"

              defaultValue={data.region}

              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Comuna</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"

              defaultValue={data.comuna}

              readOnly
            />
          </div>

        <div>
            <label className="text-sm text-gray-500">Dirección</label>
            <input
              className="w-full mt-1 p-2 border rounded-lg"

              defaultValue={data.address}

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
            defaultValue={data.description}

            readOnly />
        </Field>
        </div>


      </div>

    </div>
  );
}