"use client";

import Carouselmascota from "./Carouselmascota";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PawPrint, Venus, Mars, MapPin, Calendar, Zap, Heart, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Fichamascota() {
const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const router = useRouter();

    const toggleFav = (id: number) => {
    setFavorites((prev) => ({
        ...prev,
        [id]: !prev[id],
    }));
    };
    
  const mascota = {
    id: 1,
    nombre: "Zeus",
    raza: "Labrador Retriever",
    edad: 3,
    tipo: "Perro",
    sexo: "Macho",
    comuna: "Santiago Centro",
    caracter: "Amigable",
    niveldeenergia: 4,
    descripcion:
      "Zeus es un labrador retriever de 3 años, conocido por su naturaleza amigable y juguetona. Disfruta de largas caminatas y juegos al aire libre.",
    salud: "Vacunado y desparasitado al día.",
    refugio: "Refugio Canino Santiago Centro",
    estado: "Disponible",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* GALERÍA */}
        <div className="w-full lg:w-1/2">
        
                {/* Btn de volver */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-[#4CAF7A]"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>

        <Carouselmascota
            images={[
            "/images/Labrador.jpg",
            "/images/Labrador2.jpeg",
            "/images/Labrador3.jpg",
            ]}
            isFavorite={!!favorites[mascota.id]}
            onToggleFavorite={() => toggleFav(mascota.id)}
        />
        </div>

        {/* INFO */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-[#4CAF7A]">
              {mascota.nombre}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className="bg-green-100 text-green-700">
                {mascota.estado}
              </Badge>

              <Badge variant="outline" className="flex items-center gap-1">
                <PawPrint className="w-3 h-3" />
                {mascota.tipo}
              </Badge>

              <Badge className="bg-sky-50 text-sky-700 flex items-center gap-1">
                {mascota.sexo === "Macho" ? (
                  <Mars className="w-3 h-3" />
                ) : (
                  <Venus className="w-3 h-3" />
                )}
                {mascota.sexo}
              </Badge>
              
              <Badge className="bg-purple-100 text-purple-700">
                {mascota.caracter}
              </Badge>

              
            </div>
          </div>

          {/* GRID INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            {/* Ubicación */}
            <div>
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF7A]/10">
                    <MapPin className="w-5 h-5 text-[#4CAF7A]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ubicación</p>
                    <p className="text-sm font-semibold">{mascota.comuna}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Raza */}
            <div>
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF7A]/10">
                    <PawPrint className="w-5 h-5 text-[#4CAF7A]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Raza</p>
                    <p className="text-sm font-semibold">{mascota.raza}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Edad */}
            <div>
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF7A]/10">
                    <Calendar className="w-5 h-5 text-[#4CAF7A]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Edad</p>
                    <p className="text-sm font-semibold">
                      {mascota.edad} años
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Energía */}
            <div>
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF7A]/10">
                    <Zap className="w-5 h-5 text-[#4CAF7A]" />
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-muted-foreground">Energía</p>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4CAF7A]"
                          style={{
                            width: `${mascota.niveldeenergia * 20}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-medium">
                        {mascota.niveldeenergia}/5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* DESCRIPCIÓN */}
          <Card className="border-none shadow-sm bg-white hover:shadow-md transition">
            <CardContent className="p-4">
          <div>
            <h2 className="font-semibold mb-1">Sobre {mascota.nombre}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mascota.descripcion}
            </p>
          </div>

          {/* SALUD */}
          <div>
            <h2 className="font-semibold mb-1">Salud</h2>
            <p className="text-sm text-muted-foreground">
              {mascota.salud}
            </p>
          </div>

          {/* REFUGIO */}
          <div>
            <h2 className="font-semibold mb-1">Refugio</h2>
            <p className="text-sm text-muted-foreground">
              {mascota.refugio}
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button variant="customorange" className="w-full">
              Adoptar a {mascota.nombre}
            </Button>
          </div>
          </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}