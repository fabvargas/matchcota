"use client";
import Filtrarmascota from "./Filtrarmascota";
import { 
    Card, 
    CardContent, 
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cardmascota from "./Cardmascota";

export default function Listamascota() {
    const router = useRouter();
    return (
        <div>

            <div>
               <Filtrarmascota />  
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

            <div>
                <Cardmascota />
            </div>

            
        </div>
    );
}
