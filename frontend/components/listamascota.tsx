"use client";

import { 
    Card, 
    CardContent, 
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cardmascota, { CardMascotaProps } from "./Cardmascota";
import { useState } from "react";
import dynamic from "next/dynamic";

type ListamascotaProps = {
  mascotas: CardMascotaProps[];
};
const Filtrarmascota = dynamic(() => import("./Filtrarmascota"), {
  ssr: false,
});

export default function Listamascota({ mascotas }: ListamascotaProps) {
    const [mascotasFiltradas, setMascotasFiltradas] = useState(mascotas);

    const router = useRouter();
    return (
        <div>

            <div>
               <Filtrarmascota setMascotasFiltradas={setMascotasFiltradas} mascotas={mascotas} />  
            </div>

            <div>
                {/* Test de compatibilidad */}
                <Card className="bg-orange-100 border border-orange-300 mt-8">
                    <CardContent className="flex items-center justify-between gap-4">                       
                        <div>
                        <h3 className="text-lg font-semibold text-[#4CAF7A]">
                            ¿No sabes cuál elegir?
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Haz nuestro test de compatibilidad y encuentra tu match perfecto
                        </p>
                        </div>
                        <Button variant="customorange" onClick={() => router.push("/test")}> 
                        Realizar test
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {mascotasFiltradas.length === 0 && (
                <div className="col-span-full text-center py-10">
                    <h3 className="text-lg font-semibold">No hay mascotas en adopción</h3>
                </div>
            )}
                {
                    mascotasFiltradas.map((mascota) => (
                        <Cardmascota key={mascota.id} {...mascota} />
                    ))
                }
            </div>

            
        </div>
    );
}
