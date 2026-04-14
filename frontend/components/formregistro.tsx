"use client"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field"

import { Input } from "@/frontend/components/ui/input"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/frontend/components/ui/native-select";
import { Eye } from "lucide-react";
import { RegisterAction } from "@/app/controller/auth/RegisterAction";
import FormMessages from "./FormMessages";
import { useSubmitForm } from "../hooks/useSubmitForm";


export default function Formregistro() {
   
     const { state, isPending, handleSubmit } = useSubmitForm(RegisterAction, { error: false, message: "" });

  return (

    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Nombre</FieldLabel>
          <Input
            id="form-name"
            name="name"
            type="text"
            placeholder="Ingresa tu nombre completo"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Correo electrónico</FieldLabel>
          <Input id="form-email" name="email" type="email" placeholder="tu@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-password">Contraseña</FieldLabel>
          <div className="relative">
            <Input
                id="form-password"
                name="password"
                type="password"
                placeholder="Contraseña"
                className="pr-10"
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
                <Eye size={18} />
            </button>
            </div>

        </Field>
        <Field>
          <FieldLabel htmlFor="form-confirm-password">Confirmar contraseña</FieldLabel>
                    <div className="relative">
            <Input
                id="form-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                className="pr-10"
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
                <Eye size={18} />
            </button>
            </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-rol">¿Eres adoptante o fundación?, Elige tú rol</FieldLabel>
        </Field>

        <NativeSelect name="rol" id="form-rol" required>
          <NativeSelectOptGroup label="Rol">
            <NativeSelectOption value="Adoptante">Adoptante</NativeSelectOption>
            <NativeSelectOption value="Fundacion">Fundacion</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>

        <div>
            <button 
            disabled={isPending}
            type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {isPending ? "Registrando..." : "Registrarse"}
            </button>
        <FormMessages message={state.message} error={state.error} />
        
        </div>
        <div className="flex gap-4">      
    </div>     
        </FieldGroup>
        </form>
            </div>
                </div>
  )
}