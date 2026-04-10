
import { Button } from "@/frontend/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field"
import { Input } from "@/frontend/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/frontend/components/ui/select"

export default function Registro() {
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
          <Input id="form-password" type="password" placeholder="Ingresa tu contraseña" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-confirm-password">Confirmar contraseña</FieldLabel>
          <Input id="form-confirm-password" type="password" placeholder="Confirma tu contraseña" />
        </Field>

        

        <Field orientation="horizontal">
          <Button variant="customgreen">Registrarse</Button>
        </Field>
      </FieldGroup>
    </form>
        </div>
        </div>
  )
}

