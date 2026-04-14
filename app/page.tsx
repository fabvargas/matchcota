
"use client";
import { Button } from "@/frontend/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from "@/frontend/components/ui/card";

import { Dog, Heart, Link, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Encuentra tu compañero perfecto
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          MatchCota conecta mascotas rescatadas con familias amorosas usando un sistema inteligente 
          de compatibilidad para promover adopciones responsables y duraderas.
        </p>

        <Button
          variant="customorange"
          size="lg"
          onClick={() => router.push("/mascota")}
        >
          <Heart className="w-4 h-4" />
          Adoptar mascotas
        </Button>


        <Button variant="customgreen" size="lg"> <Dog className="w-4 h-4" />
          Publicar mascotas
        </Button>

      </div>

      <div className="flex justify-center md:justify-end">

<Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src="/images/luna.jpg"
        alt="Event cover"
      />
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle>Luna</CardTitle>
        <CardDescription>
          Hace 3 meses encontró un hogar amoroso gracias a MatchCota. 
          Es una perrita juguetona y cariñosa que adora los paseos al parque.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="customorange"className="w-full">Ver su historia</Button>
      </CardFooter>
    </Card>
      </div>

    </section>
  );
}