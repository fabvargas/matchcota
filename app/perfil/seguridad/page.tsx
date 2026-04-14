
export default function Seguridad() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Seguridad</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">
            Cambiar contraseña
          </h2>
            <div className="grid md:grid-cols-1 gap-4">
                <div>
                    <label className="text-sm text-gray-500">Contraseña actual</label>
                    <input
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su contraseña actual"
                    />  
                </div>
                <div>
                    <label className="text-sm text-gray-500">Nueva contraseña</label>
                    <input
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Ingrese su nueva contraseña"
                    />      
                </div>
                <div>
                    <label className="text-sm text-gray-500">Confirmar nueva contraseña</label>
                    <input
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Confirme su nueva contraseña"
                    />      
                </div>
            </div>

            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                Cambiar contraseña
            </button>



        </div>

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