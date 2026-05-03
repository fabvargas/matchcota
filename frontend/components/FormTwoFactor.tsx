"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import StartEnableTwoFactorAction from "@/app/controller/auth/StartEnableTwoFactorAction";
import StartDisableTwoFactorAction from "@/app/controller/auth/StartDisableTwoFactorAction";
import ConfirmEnableTwoFactorAction from "@/app/controller/auth/ConfirmEnableTwoFactorAction";
import ConfirmDisableTwoFactorAction from "@/app/controller/auth/ConfirmDisableTwoFactorAction";
import { ResponseType } from "@/app/controller/Shared/type";
import { Button } from "@/frontend/components/ui/button";

type Props = {
  initialTwoFactorEnabled: boolean;
};

type Flow = "enable" | "disable";

const initialConfirmState: ResponseType<void> = {
  error: false,
  message: "",
};

export default function FormTwoFactor({
  initialTwoFactorEnabled,
}: Props) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialTwoFactorEnabled);
  const [phase, setPhase] = useState<"idle" | "otp">("idle");
  const [flow, setFlow] = useState<Flow>("enable");
  const [setupTicket, setSetupTicket] = useState<string | null>(null);
  const [isStartPending, startTransition] = useTransition();
  const [isConfirmPending, confirmTransition] = useTransition();

  useEffect(() => {
    setEnabled(initialTwoFactorEnabled);
  }, [initialTwoFactorEnabled]);

  function handleStart(flowType: Flow) {
    startTransition(async () => {
      const result =
        flowType === "enable"
          ? await StartEnableTwoFactorAction()
          : await StartDisableTwoFactorAction();
      if (result.error || !result.data?.setupTicket) {
        toast.error(result.message || "No se pudo enviar el código");
        return;
      }
      setFlow(flowType);
      setSetupTicket(result.data.setupTicket);
      setPhase("otp");
      toast.success(result.message || "Revisa tu correo");
    });
  }

  function handleConfirmSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentFlow = flow;
    confirmTransition(async () => {
      const action =
        currentFlow === "disable"
          ? ConfirmDisableTwoFactorAction
          : ConfirmEnableTwoFactorAction;
      const result = await action(initialConfirmState, formData);
      if (result.error) {
        toast.error(result.message || "No se pudo verificar el código");
        return;
      }
      toast.success(
        result.message ||
          (currentFlow === "enable"
            ? "Verificación en dos pasos activada correctamente"
            : "Verificación en dos pasos desactivada correctamente")
      );
      setPhase("idle");
      setSetupTicket(null);
      setEnabled(currentFlow === "enable");
      router.refresh();
    });
  }

  function handleCancelOtp() {
    setPhase("idle");
    setSetupTicket(null);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Verificación en dos pasos (2FA)
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Al iniciar sesión te pediremos un código de un solo uso enviado a tu
        correo electrónico.
      </p>

      {phase === "otp" ? (
        <form
          onSubmit={handleConfirmSubmit}
          className="space-y-4 max-w-sm"
        >
          <input type="hidden" name="setupTicket" value={setupTicket ?? ""} />
          <div>
            <label htmlFor="otp-2fa" className="text-sm text-gray-500">
              {flow === "enable"
                ? "Código de activación (6 dígitos)"
                : "Código de desactivación (6 dígitos)"}
            </label>
            <input
              id="otp-2fa"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              autoComplete="one-time-code"
              className="w-full mt-1 p-2 border rounded-lg tracking-widest"
              placeholder="000000"
              required
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {flow === "enable" ? (
              <button
                type="submit"
                disabled={isConfirmPending}
                className="max-w-52 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
              >
                {isConfirmPending ? "Verificando..." : "Confirmar activación"}
              </button>
            ) : (
              <Button
                type="submit"
                variant="destructive"
                disabled={isConfirmPending}
              >
                {isConfirmPending
                  ? "Verificando..."
                  : "Confirmar desactivación"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelOtp}
              disabled={isConfirmPending}
            >
              Cancelar
            </Button>
          </div>
        </form>
      ) : enabled ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-green-700">
            La verificación en dos pasos está activada en tu cuenta.
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleStart("disable")}
            disabled={isStartPending}
          >
            {isStartPending ? "Enviando código..." : "Desactivar 2FA"}
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => handleStart("enable")}
          disabled={isStartPending}
          className="mt-2 max-w-52 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
        >
          {isStartPending ? "Enviando código..." : "Activar 2FA"}
        </button>
      )}
    </div>
  );
}
