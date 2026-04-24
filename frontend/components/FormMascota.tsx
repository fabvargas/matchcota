"use client";

import { useState } from "react";
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/frontend/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field";
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger} from "@/frontend/components/ui/select";

export default function FormMascota() {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);

  const urls = files.map((file) => URL.createObjectURL(file));
  setPreviews(urls);
  };
    
  return (
    <div className="border border-orange-200 from-orange-50 to-white shadow-sm hover:shadow-md transition rounded-2xl">

      <Card className="border border-orange-200 from-orange-50 to-white shadow-sm hover:shadow-md transition rounded-2xl">

        <CardContent className="p-6 flex flex-col gap-6">

          {/* HEADER */}
          <div>
            <h3 className="text-xl font-semibold text-[#2F2F2F]">
              Ingresar datos de la mascota
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              Completa la información para registrar o editar una mascota en adopción.
            </p>
          </div>

          {/* FORM GRID */}
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <Input
                id="nombre"
                placeholder="Ingresa nombre de la mascota"                
              />
            </Field>

            <Field>
              <FieldLabel>Raza</FieldLabel>
                <Input
                    id="raza"
                    placeholder="Ingresa la raza de la mascota"
                />
            </Field>

            <Field>
              <FieldLabel>Edad</FieldLabel>
              <Input
                id="edad"
                placeholder="Ingresa la edad de la mascota"
              />
            </Field>

            <Field>
              <FieldLabel>Tipo</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el tipo de mascota" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                    </SelectContent>
                </Select>

            </Field>

            <Field>
              <FieldLabel>Sexo</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el sexo de la mascota" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="macho">Macho</SelectItem>
                        <SelectItem value="hembra">Hembra</SelectItem>
                    </SelectContent>
                </Select>
            </Field>

            <Field>
              <FieldLabel>Comuna</FieldLabel>
              <Input
                id="comuna"
                placeholder="Santiago"
              />
            </Field>

            <Field>
              <FieldLabel>Carácter</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el carácter de la mascota" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Amigable">Amigable</SelectItem>
                        <SelectItem value="Juguetón">Juguetón</SelectItem>
                        <SelectItem value="Tranquilo">Tranquilo</SelectItem>
                        <SelectItem value="Curioso">Curioso</SelectItem>
                        <SelectItem value="Tímido">Tímido</SelectItem>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Cariñoso">Cariñoso</SelectItem>
                        <SelectItem value="Protector">Protector</SelectItem>
                        <SelectItem value="Sociable">Sociable</SelectItem>
                    </SelectContent>
                </Select>
            </Field>

            <Field>
              <FieldLabel>Energía (1-5)</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el nivel de energía de la mascota" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1 - Muy baja</SelectItem>
                        <SelectItem value="2">2 - Baja</SelectItem>
                        <SelectItem value="3">3 - Moderada</SelectItem>
                        <SelectItem value="4">4 - Alta</SelectItem>
                        <SelectItem value="5">5 - Muy alta</SelectItem>
                    </SelectContent>
                </Select>

            </Field>
            
            <Field>
              <FieldLabel>Salud</FieldLabel>
              <textarea
                id="salud"
                placeholder="(Vacunas, enfermedades, desparasitaciones, esterilización etc.)"
                className="w-full border rounded-md p-2 text-sm"
              />
            </Field>

          </FieldGroup>

          {/* DESCRIPCIÓN */}
          <Field>
            <FieldLabel>Descripción</FieldLabel>
            <textarea
              id="descripcion"
              placeholder="Descripción de la mascota"
              className="w-full border rounded-md p-2 text-sm"
            />
          </Field>

          {/* Fotos de la mascota */}
          <Field>
            <FieldLabel>Fotos de la mascota</FieldLabel>

            <div className="flex flex-col gap-4">

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
                id="upload-images"
              />

              {/* BOTÓN UPLOAD */}
              <label
                htmlFor="upload-images"
                className="cursor-pointer w-full border-2 border-dashed border-muted rounded-xl p-6 text-center text-sm text-muted-foreground hover:border-[#4CAF7A] hover:text-[#4CAF7A] transition"
              >
                Haz clic para subir fotos o selecciona varias imágenes
              </label>

              {/* PREVIEW GRID */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="relative group"
                    >
                      <img
                        src={src}
                        className="w-full h-24 object-cover rounded-lg border"
                      />

                      {/* overlay hover opcional */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition rounded-lg" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </Field>

          {/* CTA */}
          <Button
            variant="customorange"
            className="w-full md:w-auto"
          >
            Guardar
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}