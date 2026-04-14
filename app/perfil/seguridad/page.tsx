import FormChangePassword from "@/frontend/components/FormChangePassword"


export default function Seguridad() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Seguridad</h1>
        <FormChangePassword />

        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
            Eliminar cuenta
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                Al eliminar tu cuenta, todos tus datos serán borrados permanentemente.
            </p>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                Eliminar cuenta
            </button>
        </div>

        </div>

    </div>
  );
}