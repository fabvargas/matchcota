"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/frontend/components/ui/input";
import { Field, FieldLabel } from "@/frontend/components/ui/field";
import { Button } from "@/frontend/components/ui/button";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";




export function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/Logomc_icon.png"
                alt="MatchCota Logo"
                width={40}
                height={40}
            />
            <span className="font-bold text-lg">MatchCota</span>

            </Link>
          <p className="text-sm mt-2 mb-4">
            Conectamos personas con mascotas para fomentar adopciones responsables.
          </p>

          <div>
            <FieldLabel className="mb-3 font-semibold">Suscríbete a nuestra newsletter</FieldLabel>
            <Field orientation="horizontal">
                <Input type="search" placeholder="Ingrese su email" />
                <Button variant={"customgreen"}>Suscribirse</Button>
            </Field>
            
          </div>



        </div>
        

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold">Navegación</h3>
          <Link href="/mascotas" className="hover:text-blue-600">
            Mascotas
          </Link>
          <Link href="/nosotros" className="hover:text-blue-600">
            Nosotros
          </Link>
          <Link href="/contacto" className="hover:text-blue-600">
            Contacto
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold">Contacto</h3>
          <p className="text-gray-600">Contacto@matchcota.cl</p>
          <p className="text-gray-600">Santiago, Chile</p>
        </div>

        <div className="flex flex-col gap-2 text-sm"> 
            <h3 className="font-semibold">Redes sociales</h3>
            <div className="flex gap-3">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
                <FaLinkedin />
            </div>

        </div>

      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} MatchCota. Todos los derechos reservados.
      </div>
    </footer>
  );
}