"use client";

import { SyntheticEvent, useState } from "react";
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/frontend/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/frontend/components/ui/field";
import CustomSelect from "./CustomSelect";
import { breedByType, caracterOptions, energyLevel, genreOptions, PetType, sizeOptions, typeMascota, } from "../lib/petOptions";
import { comunaOptions } from "../lib/petOptions";

import { CardMascotaProps } from "./Cardmascota";
import { useSession } from "next-auth/react";
import { useUploadImages } from "../hooks/useUploadImages";





export default function FormMascota(
 { handleSubmit, isPending, state , mascota }: { handleSubmit: (e: SyntheticEvent<HTMLFormElement>, formData: FormData) => void; isPending: boolean; state: { error: boolean; message: string }; mascota?: CardMascotaProps  }
) {
  const [previews, setPreviews] = useState<string[]>([]);
const [type, setType] = useState<PetType | null>(mascota ? (mascota.tipo as PetType) : null);
const [files, setFiles] = useState<File[]>([]);
const { data: session } = useSession();
const {uploadImages} = useUploadImages(session?.user.id || "");

const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);

  setFiles(selectedFiles);

  const previewUrls = selectedFiles.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviews(previewUrls);
};
  

const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
   e.preventDefault();

    if (!session?.user?.id) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 🚀 subir imágenes AQUÍ
    const urls = await uploadImages(files);

    console.log("URLs obtenidas después de subir imágenes:", urls);

    urls.forEach((url) => {
      formData.append("urls", url);
    });

    handleSubmit(e, formData);
}
 
    
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
          <form onSubmit={handleFormSubmit} className="w-full">
          {/* FORM GRID */}
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <Input
                name="name"
                id="nombre"
                placeholder="Ingresa nombre de la mascota"      
                required          
                 defaultValue={mascota?.nombre}
              />
            </Field>

                   <Field>
              <FieldLabel>Tipo</FieldLabel>
           <CustomSelect
          items={typeMascota.map(t => ({ value: t, label: t }))}
          name="type"
          onChange={(value) => setType(value as PetType)}
          required
          defaultValue={mascota?.tipo}

        />


    </Field>

        
         <Field>
  <FieldLabel>Raza</FieldLabel>
        <CustomSelect
          items={
            type
              ? breedByType[type as PetType].map(breed => ({
                  value: breed,
                  label: breed
                }))
              : []
          }
          name="breed"
          disabled={!type}
          placeholder="Selecciona la raza de la mascota"
          required
          defaultValue={mascota?.raza}
        />
      </Field>

            <Field>
              <FieldLabel>Edad</FieldLabel>
              <Input
                name="age"
                id="edad"
                placeholder="Ingresa la edad de la mascota"
                required
                defaultValue={mascota?.edad.toString()}
              />
            </Field>

     

           

          <Field>
              <FieldLabel>Género</FieldLabel>
            <CustomSelect
              items={genreOptions.map(genre => ({
                value: genre,
                label: genre
              }))}
              name="genre"
              placeholder="Selecciona el género de la mascota"
              required
              defaultValue={mascota?.sexo}
            />
          </Field>

            <Field>
              <FieldLabel>Comuna</FieldLabel>
              <CustomSelect
                  items={comunaOptions.map(comuna => ({ value: comuna, label: comuna }))}
                  name="comuna"
                  placeholder="Selecciona la comuna de la mascota"
                  required
                    defaultValue={mascota?.comuna}
                />
            </Field>

            <Field>
              <FieldLabel>Carácter</FieldLabel>
              <CustomSelect
                  items={caracterOptions.map(caracter => ({ value: caracter, label: caracter }))}
                  name="caracter"
                  placeholder="Selecciona el carácter de la mascota"
                  required
                    defaultValue={mascota?.caracter}
                />
            </Field>

            <Field>
              <FieldLabel>Energía (1-5)</FieldLabel>
                <CustomSelect
                  items={energyLevel.map(level => ({ value: level, label: `${level}` }))}
                  name="energy"
                  placeholder="Selecciona el nivel de energía de la mascota"
                  required
                    defaultValue={mascota?.nivel_energia.toString()}
                />
                
            </Field>

        <Field>
          <FieldLabel>Tamaño</FieldLabel>
           <CustomSelect
            items={sizeOptions.map(size => ({ value: size, label: size }))}
            name="size"
            placeholder="Selecciona el tamaño de la mascota"
            required
            defaultValue={mascota?.size}
          />
        </Field>
            
            <Field>
              <FieldLabel>Salud</FieldLabel>
              <textarea
                name="health_description"
                id="salud"
                placeholder="(Vacunas, enfermedades, desparasitaciones, esterilización etc.)"
                className="w-full border rounded-md p-2 text-sm"
                required
                defaultValue={mascota?.health_description}
              />
            </Field>

          </FieldGroup>

          {/* DESCRIPCIÓN */}
          <Field>
            <FieldLabel>Descripción</FieldLabel>
            <textarea
              name="description"
              id="descripcion"
              placeholder="Descripción de la mascota"
              className="w-full border rounded-md p-2 text-sm"
              required
              defaultValue={mascota?.descripcion}
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

          {
            mascota && (
              <input type="hidden" name="id" value={mascota.id} />
            )
          }

          {/* CTA */}
          <Button
            type="submit"
            variant="customorange"
            className="w-full md:w-auto"
          >
            {isPending ? "Guardando..." : "Guardar Mascota"}
          </Button>
          {state?.error && (
            <p className="text-sm text-red-500 mt-2 text-center">{state.message || "Error al guardar la mascota"}</p>
          )}
          {state?.message && !state.error && (
            <p className="text-sm text-green-500 mt-2 text-center">{state.message || "Mascota guardada exitosamente"}</p>
          )}
              </form>
        </CardContent>
      </Card>

    </div>
  );
}