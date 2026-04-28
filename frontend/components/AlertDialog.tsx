
"use client";

import { Button } from "@/frontend/components/ui/button"
import { useSubmitForm } from "../hooks/useSubmitForm";
import DeleteUserProfile from "@/app/controller/profile/DeleteUserProfile";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from "@/frontend/components/ui/dialog";

export default function AlertDialogBasic() {
const {state, isPending, handleSubmit } = useSubmitForm(DeleteUserProfile, {error: false, message: ""},"/");



  return (
    <Dialog>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar perfil</Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <DialogTitle className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar tu perfil?</DialogTitle>
        <DialogDescription className="mb-6 text-gray-600">Esta acción no se puede deshacer.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => {}} disabled={isPending}>Cancelar</Button>
          <Button type="submit" variant="destructive" disabled={isPending}>
            {isPending ? "Eliminando..." : "Eliminar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

}
