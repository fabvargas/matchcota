"use client";

import LogInAction from "@/app/controller/auth/LogInAction";
import Image from "next/image";
import Link from "next/link";  
import { useSubmitForm } from "../hooks/useSubmitForm";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

export default function FormLogin() {
    const { state, isPending, handleSubmit } = useSubmitForm(LogInAction, { error: false, message: "" });

useEffect(() => {
  if (state?.error) {
    toast.error(state.message || "Credenciales incorrectas");
    return;
  }

  if (state?.message) {
    toast.success(state.message || "Inicio de sesión exitoso");
  }
}, [state]);
    
  return (
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> 
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="tu@email.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
                </div>
                <div>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                        <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
                        <a href="#" className="ml-auto text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                    </label>
                </div>
                <div>
                    <Button type="submit" variant="customlogin" size="lg">
                        {isPending ? "Iniciando..." : "Iniciar Sesión"}
                    </Button>
                    
                </div>
                <div>
                    <Button
                    disabled={isPending}
                    variant="customgoogle"
                    size="lg"
                    >
                    <Image
                        src="/images/google.png"
                        alt="Google logo"
                        width={18}
                        height={18}
                     />
                    <span>Iniciar con Google</span>
                    </Button>

                </div>
                <div>
                    <p className="text-center text-sm text-gray-600">¿No tienes una cuenta? <Link href="/registro" className="text-blue-600 hover:underline">Regístrate</Link></p>
                </div>
            </form>
        </div>
  )
}
