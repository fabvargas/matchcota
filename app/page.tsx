"use client";
import { Button } from "@/frontend/components/ui/button";
import { BookCheck, BookmarkCheck, Dog, Heart, TestTube, TestTube2, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Homecarousel from "@/frontend/components/Homecarousel";
import { RegisterAction } from "./controller/auth/RegisterAction";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Encuentra tu compañero perfecto
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            MatchCota conecta mascotas rescatadas con familias amorosas usando un sistema inteligente 
            de compatibilidad para promover adopciones responsables y duraderas.
          </p>

          <div className="flex gap-4">
            <Button
              variant="customorange"
              size="lg"
              onClick={() => router.push("/mascota")}
            >
              <Heart className="w-4 h-4" />
              Adoptar mascotas
            </Button>

            <Button variant="customgreen" size="lg">
              <Dog className="w-4 h-4" />
              Publicar mascotas
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Homecarousel />
        </div>
      </section>

            <section className="bg-[#FFF6F0] py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            ¿Cómo adoptar?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <UserCheck className="w-8 h-8 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Registrate</h3>
              <p className="text-gray-600">
                Crea una cuenta gratuita para comenzar tu viaje de adopción.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TestTube2 className="w-8 h-8 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Realiza el test</h3>
              <p className="text-gray-600">
                Realiza nuestro test de compatibilidad para encontrar mascotas que se adapten a tu estilo de vida.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BookmarkCheck className="w-8 h-8 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Estas listo para adoptar</h3>
              <p className="text-gray-600">
                Contacta a los refugios o familias para conocer a tu nuevo compañero y completar el proceso de adopción.
              </p>
            </div>
            </div>

        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            ¿Por qué elegir MatchCota?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="w-8 h-8 text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Adopción Responsable</h3>
              <p className="text-gray-600">
                Promovemos la adopción responsable conectando mascotas rescatadas con familias amorosas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Dog className="w-8 h-8 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Compatibilidad Inteligente</h3>
              <p className="text-gray-600">
                Nuestro sistema inteligente de compatibilidad ayuda a encontrar el compañero perfecto para cada familia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Comunidad Amorosa</h3>
              <p className="text-gray-600">
                Únete a una comunidad amorosa que apoya la adopción y el bienestar de las mascotas.
              </p>
            </div>

          </div>

        </div>
      </section>


 






    </>
  );
}