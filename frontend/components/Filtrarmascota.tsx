
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


export default function Filtrarmascota() {
    return (
        <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-3">
            <div className="flex flex-col md:flex-row gap-3 flex-1">

            {/* Buscar por comuna*/}
            <InputGroup>
                <InputGroupInput id="inline-start-input" placeholder="Buscar por comuna" />
                <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
            </InputGroup>
            </div>

            {/* Buscar por tipo de mascota*/}
            <Combobox>
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
            <Combobox>
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
            <Combobox>
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

        </div>
    );
}