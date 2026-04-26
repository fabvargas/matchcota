"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/frontend/components/ui/dialog";

import FormMascota from "./FormMascota";
import { UpdatePetAction } from "@/app/controller/pet/UpdatePetAction";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { CardMascotaProps } from "./Cardmascota";

export default function EditarMascota(
  { mascota }: { mascota: CardMascotaProps }
  ) {
  const [open, setOpen] = useState(false);
   const {state, handleSubmit, isPending} = useSubmitForm(UpdatePetAction, {error:false,message:""});

  return (
    <Dialog open={open} onOpenChange={setOpen}>

        {/* BOTÓN QUE ABRE MODAL */}
        <DialogTrigger asChild>
        <Button
            variant="outline"
            className="w-full border-[#4CAF7A] text-[#4CAF7A] hover:bg-[#4CAF7A]/10 transition"
        >
            Editar mascota
        </Button>
        </DialogTrigger>

      {/* MODAL */}
      <DialogContent
        className="
            w-[95vw]
            max-w-4xl
            sm:max-w-5xl
            lg:max-w-6xl
            max-h-[90vh]
            overflow-y-auto
            rounded-2xl
        "
        >
<DialogHeader>
  <DialogTitle className="text-xl font-bold text-[#4CAF7A]">
    Editar mascota
  </DialogTitle>

  <DialogDescription className="text-sm text-muted-foreground">
    Modifica la información de la mascota antes de guardar los cambios.
  </DialogDescription>
</DialogHeader>

        {/* FORM REUTILIZADO */}
        <FormMascota  
        handleSubmit={handleSubmit}
        isPending={isPending}
        state={state}
        mascota={mascota}
       
        />

      </DialogContent>

    </Dialog>
  );
}