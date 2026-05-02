"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/frontend/components/ui/dialog"
import { Button } from "@/frontend/components/ui/button"
import { useSession } from "next-auth/react";
import { AdopcionConfirm } from "@/app/controller/solicitud/AdopcionConfirm";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useEffect, useState } from "react";


export function AdoptarDialog({ mascotaId, refugioId }: { mascotaId: string, refugioId: string }) {

    const {state,handleSubmit,isPending} = useSubmitForm(AdopcionConfirm, {error: false, message: ""}, "/mascota/" + mascotaId);
    const [open, setOpen] = useState(false);


    useEffect(() => {
  if (!state.error && state.message) {
    setOpen(false); // 🔥 cierra el dialog cuando todo sale bien
  }
}, [state]);

    
  return (
  <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="customorange" className="w-full">
          Confirmar Adopción
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Adopción</DialogTitle>
          <DialogDescription>
            Escribe un mensaje para el refugio
          </DialogDescription>
        </DialogHeader>

        {/* 🔥 FORM conectado al server action */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="hidden" name="mascotaId" value={mascotaId} />
          <input type="hidden" name="refugioId" value={refugioId} />
    

          <textarea
            name="mensaje"
            placeholder="Cuéntanos por qué quieres adoptar..."
            className="w-full border rounded-md p-2 text-sm"
            required
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            {/* 🔥 submit real */}
            <Button type="submit" variant="customorange">
              Enviar solicitud
            </Button>
          </DialogFooter>

        </form>
      
      </DialogContent>
    </Dialog>
  )
}