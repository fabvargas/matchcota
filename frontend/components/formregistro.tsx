"use client"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field"

import { Input } from "@/frontend/components/ui/input"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/frontend/components/ui/native-select";
import { Eye, EyeOff } from "lucide-react";
import { RegisterAction } from "@/app/controller/auth/RegisterAction";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";




export default function Formregistro() {
   
     const { state, isPending, handleSubmit } = useSubmitForm(RegisterAction, { error: false, message: "" });
     const [showPassword, setShowPassword] = useState(false);

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
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-confirm-password">Confirmar contraseña</FieldLabel>
                    <div className="relative">
            <Input
                id="form-confirm-password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className="pr-10"
            />
            <button
                type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-rol">¿Eres adoptante o refugio?, Elige tú rol</FieldLabel>
        </Field>

        <NativeSelect name="rol" id="form-rol" required>
          <NativeSelectOptGroup label="Rol">
            <NativeSelectOption value="Adoptante">Adoptante</NativeSelectOption>
            <NativeSelectOption value="Refugio">Refugio</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>

        <div>
          <FieldLabel htmlFor="form-terms" className="flex items-center gap-2">
            <input type="checkbox" id="form-terms" name="terms" required className="form-checkbox" />
            Acepto los términos y condiciones
          </FieldLabel>
        </div>

        <div>
            <Button 
            disabled={isPending}

            type="submit" 
            variant="customlogin" size="lg">
                {isPending ? "Registrando..." : "Registrarse"}
            </Button>       
        </div>
        <div className="flex gap-4">      
    </div>     
        </FieldGroup>
        </form>
            </div>
                </div>
  )
}