"use client";

import LogInAction from "@/app/controller/auth/LogInAction";
import Image from "next/image";
import Link from "next/link";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import type { LoginActionData, ResponseType } from "@/app/controller/Shared/type";

const initialLoginState: ResponseType<LoginActionData> = {
  error: false,
  message: "",
  data: undefined,
};

export default function FormLogin() {

  const router = useRouter();
  const { state, isPending, handleSubmit } = useSubmitForm(
    LogInAction,
    initialLoginState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loginTicket, setLoginTicket] = useState("");


  useEffect(() => {
    if (state?.data?.requiresOtp && state.data.loginTicket) {
      setLoginTicket(state.data.loginTicket);
    }
  }, [state?.data?.requiresOtp, state?.data?.loginTicket]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message || "Credenciales incorrectas");
      return;
    }

    if (!state?.message) return;

    if (state.data?.requiresOtp) {
      toast.success(state.message || "Revisa tu correo");
      return;
    }

    toast.success(state.message || "Inicio de sesión exitoso");
    router.push("/perfil");
  }, [state, router]);

  const effectiveTicket = state?.data?.loginTicket ?? loginTicket;
  const otpEmail = state?.data?.email ?? "";
  const showOtpStep = Boolean(
    state?.data?.requiresOtp && effectiveTicket && otpEmail
  );

  const loginSucceeded =
    state?.message === "Inicio de sesión exitoso" && state.error === false;

  if (loginSucceeded) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center text-gray-600">
        Ingresando…
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {!showOtpStep ? (
          <>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <input type="hidden" name="step" value="verify_otp" />
            <input type="hidden" name="login_ticket" value={effectiveTicket} />
            <input type="hidden" name="email" value={otpEmail} readOnly />
            <p className="text-sm text-gray-600 text-center">
              Ingresa el código de 6 dígitos que enviamos a tu correo.
            </p>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Código
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="otp"
                name="otp"
                maxLength={6}
                autoComplete="one-time-code"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                placeholder="000000"
              />
            </div>
          </>
        )}

        <div>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
            <a href="#" className="ml-auto text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </label>
        </div>
        <div>
          <Button type="submit" variant="customlogin" size="lg">
            {isPending
              ? "Procesando..."
              : showOtpStep
                ? "Confirmar código"
                : "Iniciar Sesión"}
          </Button>
        </div>
        <div>
          <Button disabled={isPending} variant="customgoogle" size="lg">
            <Image
              src="/images/google.png"
              alt="Google logo"
              width={18}
              height={18}
            />
            <span>Iniciar con Google</span>
          </Button>
        </div>
        <div>
          <p className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
