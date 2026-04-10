"use server";

import { ResponseType } from "@/app/controller/Shared/type";

export default async function LogOut(): Promise<ResponseType<void>> {
    try {
        // Aquí iría la lógica para cerrar sesión
        return {
            error: false,
            message: "Cierre de sesión exitoso"
        };
    } catch (error) {
        return {
            error: true,
            message: "Error inesperado, intente nuevamente"
        };
    }
}