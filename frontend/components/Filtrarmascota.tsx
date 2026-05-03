
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/frontend/components/ui/input-group"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/frontend/components/ui/combobox"

import { SearchIcon } from "lucide-react"
import { CardMascotaProps } from "./Cardmascota"
import { useState ,useEffect} from "react"
import { Button } from "./ui/button"


const tipo_mascota = [
    { id: 1, name: "Perro" },
    { id: 2, name: "Gato" },
]
const sexo = [
    { id: 1, name: "Macho" },
    { id: 2, name: "Hembra" },
]

const caracter = [
    { id: 1, name: "Amigable" },
    { id: 2, name: "Juguetón" },
    { id: 3, name: "Tranquilo" },
    { id: 4, name: "Curioso" },
    { id: 5, name: "Tímido" },
    { id: 6, name: "Cariñoso" },
    { id: 7, name: "Activo" },
    { id: 8, name: "Protector" },
    { id: 9, name: "Sociable" },

]
export const comuna = [

    { id:1, label: "Puerto Montt" },
    { id:2, label: "Puerto Varas" },
    { id:3, label: "Castro" },
    { id:4, label: "Ancud" },
    { id:5, label: "Santiago" },
    { id:6, label: "Maipú" },
    { id:7, label: "Puente Alto" },
    { id:8, label: "La Florida" },
    { id:9, label: "Valparaíso" },
    { id:10, label: "Viña del Mar" },
    { id:11, label: "Quilpué" },
    { id:12, label: "Villa Alegre" },
    { id:13, label: "Concepción" },
    { id:14, label: "Chillán" },
    { id:15, label: "Coronel" },
    { id:16, label: "Hualpén" },
  ]

  

export default function Filtrarmascota({ setMascotasFiltradas, mascotas }: { setMascotasFiltradas: React.Dispatch<React.SetStateAction<CardMascotaProps[]>>, mascotas: CardMascotaProps[] }) {

    
  const [region, setRegion] = useState("");
  const [tipo, setTipo] = useState("");
  const [sexoSelected, setSexoSelected] = useState("");
  const [caracterSelected, setCaracterSelected] = useState("");





useEffect(() => {
  let resultado = mascotas;

  if (region) {
    resultado = resultado.filter(m => m.comuna === comuna.find(c => c.label === region)?.label);
  }

  if (tipo) {
    resultado = resultado.filter(m => m.tipo === tipo);
  }

  if (sexoSelected) {
    resultado = resultado.filter(m => m.sexo === sexoSelected);
  }

  if (caracterSelected) {
    resultado = resultado.filter(m => m.caracter === caracterSelected);
  }

  setMascotasFiltradas(resultado);

}, [region, tipo, sexoSelected, caracterSelected, mascotas]);





    return (
        <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-3 items-center">
                
            <Combobox value={region} onValueChange={(value) => setRegion((value as string) ?? "")}>
                <ComboboxInput placeholder="Buscar por región" />
                <ComboboxContent>
                    <ComboboxList>
                        {comuna.map((item) => (
                            <ComboboxItem key={item.id} value={item.label}>
                                {item.label}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {/* Buscar por tipo de mascota*/}
            <Combobox value={tipo} onValueChange={(value) => setTipo((value as string) ?? "")}>
                <ComboboxInput placeholder="Tipo de mascota" />
                <ComboboxContent>
                    <ComboboxList>
                        {tipo_mascota.map((item) => (
                            <ComboboxItem key={item.id} value={item.name}>
                                {item.name}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {/* Buscar por sexo*/}                
            <Combobox value={sexoSelected} onValueChange={(value) => setSexoSelected((value as string) ?? "")}>
                <ComboboxInput placeholder="Filtra por sexo" />
                <ComboboxContent>
                    <ComboboxList>
                        {sexo.map((item) => (
                            <ComboboxItem key={item.id} value={item.name}>
                                {item.name}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {/* Buscar por caracter*/}
            <Combobox value={caracterSelected} onValueChange={(value) => setCaracterSelected((value as string) ?? "")}>
                <ComboboxInput placeholder="Filtra por caracter" />
                <ComboboxContent>
                    <ComboboxList>
                        {caracter.map((item) => (
                            <ComboboxItem key={item.id} value={item.name}>
                                {item.name}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            <Button
  onClick={() => {
    setRegion("");
    setTipo("");
    setSexoSelected("");
    setCaracterSelected("");
  }}
  variant="outline"
>
  Limpiar filtros
</Button>

        </div>
    );
}