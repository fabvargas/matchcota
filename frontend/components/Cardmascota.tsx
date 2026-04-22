"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle, CardAction, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PawPrint, Heart, MapPinned, Venus, Mars } from "lucide-react";

export default function Cardmascota() {
    const router = useRouter();
    

    // 🔹 Datos de mascotas
    const mascotas = [
        {
            id: 1,
            nombre: "Zeus",
            raza: "Labrador Retriever",
            edad: 3,
            tipo: "Perro",
            sexo: "Macho",
            comuna: "Santiago Centro",
            caracter: "Amigable",
            img: "/images/Labrador.jpg",
        },
        {
            id: 2,
            nombre: "Valki",
            raza: "German Shepherd",
            edad: 4,
            tipo: "Perro",
            sexo: "Macho",
            comuna: "Valparaíso",
            caracter: "Protector",
            img: "/images/Valki.jpg",
        },
        {
            id: 3,
            nombre: "Pelusa",
            raza: "Siamés Mix",
            edad: 2,
            tipo: "Gato",
            sexo: "Hembra",
            comuna: "Providencia",
            caracter: "Curiosa",
            img: "/images/pelusa.jpg",
        },
    ];

    // 🔹 Estado de favoritos
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const toggleFav = (id: number) => {
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

            {mascotas.map((m) => (
                <Card key={m.id} className="relative mx-auto w-full max-w-sm pt-0">

                    {/*Btn favorito */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFav(m.id)}
                        className="absolute top-2 right-2 z-40 bg-white/80 hover:bg-white rounded-full"
                    >
                        <Heart
                            className={`w-5 h-5 transition-all duration-200 ${
                                favorites[m.id]
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-gray-400"
                            }`}
                        />
                    </Button>

                    <div className="absolute inset-0 z-30 aspect-video" />

                    <img
                        src={m.img}
                        alt={m.nombre}
                        className="relative z-20 aspect-video w-full object-cover"
                    />

                    <CardHeader>
                        <CardAction>
                            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                Disponible
                            </Badge>

                            <Badge
                                className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                                >
                                {m.sexo === "Macho" ? (
                                    <Mars className="w-3 h-3" />
                                ) : (
                                    <Venus className="w-3 h-3" />
                                )}
                                {m.sexo}
                            </Badge>

                            <Badge variant="outline">
                                {m.tipo}
                                <PawPrint data-icon="inline-end" />
                            </Badge>

                        </CardAction>

                        <CardTitle>{m.nombre}</CardTitle>
                        <CardDescription>Raza: {m.raza}</CardDescription>
                        <CardDescription>Edad: {m.edad} años</CardDescription>
                        <CardDescription> <MapPinned className="w-4 h-4 inline mr-2" /> {m.comuna}</CardDescription>
                        <CardDescription>Carácter: {m.caracter}</CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <Button
                            variant="customorange"
                            className="w-full"
                            onClick={() => router.push(`/mascota/${m.id}`)}
                        >
                            Ver más
                        </Button>
                    </CardFooter>

                </Card>
            ))}

        </div>
    );
}