// =============================
// 🐾 TIPOS
// =============================

export type PetType = "Perro" | "Gato";

export type PetSize = "Pequeño" | "Mediano" | "Grande";

export type PetCaracter =
  | "Amigable"
  | "Juguetón"
  | "Tranquilo"
  | "Curioso"
  | "Tímido"
  | "Activo"
  | "Cariñoso"
  | "Protector"
  | "Sociable";

export type EnergyLevel =  | "1" | "2" | "3" | "4" | "5";

export type PetGenre = "Macho" | "Hembra";

export type ComunaMascota = 
  | "Puerto Montt"
  | "Puerto Varas"
  | "Castro"
  | "Ancud"
  | "Santiago"
  | "Maipú"
  | "Puente Alto"
  | "La Florida"
  | "Valparaíso"
  | "Viña del Mar"
  | "Quilpué"
  | "Concepción"
  | "Chillán"
  | "Coronel"
  | "Hualpén";


// =============================
// 🐶🐱 RAZAS POR TIPO
// =============================

export const breedByType: Record<PetType, string[]> = {
  Perro: [
    "Labrador Retriever",
    "Pastor Alemán",
    "Golden Retriever",
    "Bulldog Inglés",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund",
    "Chihuahua",
    "Border Collie",
    "Husky Siberiano",
    "Shih Tzu",
    "Cocker Spaniel",
  ],
  Gato: [
    "Siamés",
    "Persa",
    "Maine Coon",
    "Bengalí",
    "Sphynx",
    "Ragdoll",
    "British Shorthair",
    "Scottish Fold",
    "Abisinio",
    "Azul Ruso",
  ],
};


// =============================
// 📦 LISTAS GENERALES
// =============================

export const typeMascota: PetType[] = ["Perro", "Gato"];

export const sizeOptions: PetSize[] = ["Pequeño", "Mediano", "Grande"];


export const energyLevel: EnergyLevel[] = ["1", "2", "3", "4", "5"];

export const genreOptions: PetGenre[] = ["Macho", "Hembra"];

export const comunaOptions: ComunaMascota[] = [
  "Puerto Montt",
  "Puerto Varas",
  "Castro",
  "Ancud",
  "Santiago",
  "Maipú",
  "Puente Alto",
  "La Florida",
  "Valparaíso",
  "Viña del Mar",
  "Quilpué",
  "Concepción",
  "Chillán",
  "Coronel",
  "Hualpén"
];

export const caracterOptions: PetCaracter[] = [
  "Amigable",
  "Juguetón",
  "Tranquilo",
  "Curioso",
  "Tímido",
  "Activo",
  "Cariñoso",
  "Protector",
  "Sociable"
];
// =============================
// 🔧 HELPERS (MUY ÚTILES)
// =============================

export function getBreedsByType(type: PetType): string[] {
  return breedByType[type] || [];
}

export function isValidBreed(type: PetType, breed: string): boolean {
  return breedByType[type]?.includes(breed) ?? false;
}