
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field"

import { Input } from "@/frontend/components/ui/input"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/frontend/components/ui/native-select";
import { Eye } from "lucide-react";


export default function Formregistro() {

  return (

    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Nombre</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Ingresa tu nombre completo"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Correo electrónico</FieldLabel>
          <Input id="form-email" type="email" placeholder="tu@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-password">Contraseña</FieldLabel>
          <div className="relative">
            <Input
                id="form-password"
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

        <NativeSelect>
          <NativeSelectOptGroup label="Rol">
            <NativeSelectOption value="Adoptante">Adoptante</NativeSelectOption>
            <NativeSelectOption value="Fundacion">Fundacion</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>

        <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Registrarse
            </button>
        </div>
        <div className="flex gap-4">      
    </div>     
        </FieldGroup>
        </form>
            </div>
                </div>
  )
}