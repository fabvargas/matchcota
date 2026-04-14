"use client"

import ChangePasswordAction from "@/app/controller/auth/ChangePasswordAction"
import { useSubmitForm } from "../hooks/useSubmitForm"
import FormMessages from "./FormMessages"


export default function FormChangePassword() {
    const {state,handleSubmit,isPending}=useSubmitForm(ChangePasswordAction, {
        error: false,
        message: ""
    })
  return (
   <div className="bg-white rounded-xl shadow p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">
            Cambiar contraseña
          </h2>
            <form 
            onSubmit={handleSubmit}
            className="grid md:grid-cols-1 gap-4">
                <div>
                    <label className="text-sm text-gray-500">Contraseña actual</label>
                    <input
                    name="currentPassword"
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su contraseña actual"
                    />  
                </div>
                <div>
                    <label className="text-sm text-gray-500">Nueva contraseña</label>
                    <input
                    name="newPassword"
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su nueva contraseña"
                    />      
                </div>
                <div>
                    <label className="text-sm text-gray-500">Confirmar nueva contraseña</label>
                    <input
                    name="confirmNewPassword"
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Confirme su nueva contraseña"
                    />      
                </div>

            <button className="mt-4 max-w-52 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
               {isPending ? "Cambiando..." : "Cambiar contraseña"}
            </button>
            <FormMessages message={state.message} error={state.error} />
            </form>

        </div>
  )
}
