"use client"

import ChangePasswordAction from "@/app/controller/auth/ChangePasswordAction"
import { useSubmitForm } from "../hooks/useSubmitForm"
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";



export default function FormChangePassword() {
    const {state,handleSubmit,isPending}=useSubmitForm(ChangePasswordAction, {
        error: false,
        message: ""
    })
    const [showPassword, setShowPassword] = useState(false);
        useEffect(() => {
        if (state?.error) {
            toast.error(state.message || "Contraseña actual incorrecta");
            return;
        }

        if (state?.message) {
            toast.success(state.message || "Contraseña cambiada exitosamente");
        }
        }, [state]);

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
                    <div className="relative">
                    <input
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su contraseña actual"
                                       
                                       />    
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
                </div> 

                </div>
                <div>
                    <label className="text-sm text-gray-500">Nueva contraseña</label>
                    <div className="relative">
                    <input
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su nueva contraseña"
                    />  
                    <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
                    </div>        
                </div>
                <div>
                    <label className="text-sm text-gray-500">Confirmar nueva contraseña</label>
                    <div className="relative">
                    <input
                    name="confirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Confirme su nueva contraseña"
                    />
                    <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
                    </div>             
                </div>

            <button className="mt-4 max-w-52 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
               {isPending ? "Cambiando..." : "Cambiar contraseña"}
            </button>
            </form>

        </div>
  )
}
