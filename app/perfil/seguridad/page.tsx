import FormChangePassword from "@/frontend/components/FormChangePassword"
import FormTwoFactor from "@/frontend/components/FormTwoFactor"
import AlertDialogBasic from "@/frontend/components/AlertDialog"
import GetProfile from "@/app/controller/profile/GetProfile"

export default async function Seguridad() {
  const profile = await GetProfile()
  const twoFactorEnabled = Boolean(profile.data?.twoFactorEnabled)

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Seguridad</h1>
        <FormChangePassword />

        <FormTwoFactor initialTwoFactorEnabled={twoFactorEnabled} />

        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
            Eliminar cuenta
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                Al eliminar tu cuenta, todos tus datos serán borrados permanentemente.
            </p>
            <AlertDialogBasic />
        </div>

        </div>

    </div>
  );
}