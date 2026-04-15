"use client";

import LogInAction from "@/app/controller/auth/LogInAction";
import Image from "next/image";
import Link from "next/link";  
import { startTransition, useActionState } from "react";
import FormMessages from "./FormMessages";
import { useSubmitForm } from "../hooks/useSubmitForm";


export default function FormLogin() {
    const { state, isPending, handleSubmit } = useSubmitForm(LogInAction, { error: false, message: "" });
    
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
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {isPending ? "Iniciando..." : "Iniciar Sesión"}
                    </button>
                    <FormMessages message={state.message} error={state.error} />
                </div>
                <div>
                    <button
                    disabled={isPending}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 
                                bg-white text-gray-700 font-medium 
                                py-3 px-4 rounded-lg 
                                border border-gray-300 shadow-sm
                                hover:shadow-md hover:bg-gray-50 
                                transition-all"
                    >
                    <Image
                        src="/images/google.png"
                        alt="Google logo"
                        width={18}
                        height={18}
                     />
                    <span>Usar con Google</span>
                    </button>
                </div>
                <div>
                    <p className="text-center text-sm text-gray-600">¿No tienes una cuenta? <Link href="/registro" className="text-blue-600 hover:underline">Regístrate</Link></p>
                </div>
            </form>
        </div>
  )
}
