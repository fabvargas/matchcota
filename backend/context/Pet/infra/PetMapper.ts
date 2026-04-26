import { Pet } from "../domain/Pet";

export class PetMapper {

  // 🔥 catálogos hardcodeados según tu seed
  private static catalogs: { [key: string]: { [key: string]: number } } = {

    tipo: {
      "Perro": 1,
      "Gato": 2,
    },

    sexo: {
      "Macho": 1,
      "Hembra": 2,
    },

    estado: {
      "Disponible": 1,
      "Adoptado": 2,
    },

    comuna: {
      "Puerto Montt": 1,
      "Puerto Varas": 2,
      "Castro": 3,
      "Ancud": 4,
      "Santiago": 5,
      "Maipú": 6,
      "Puente Alto": 7,
      "La Florida": 8,
      "Valparaíso": 9,
      "Viña del Mar": 10,
      "Quilpué": 11,
      "Concepción": 12,
      "Chillán": 13,
      "Coronel": 14,
      "Hualpén": 15,
    },

    caracter: {
      "Amigable": 1,
      "Juguetón": 2,
      "Tranquilo": 3,
      "Curioso": 4,
      "Tímido": 5,
      "Activo": 6,
      "Cariñoso": 7,
      "Protector": 8,
      "Sociable": 9,
    },
    
    size: {
      "Pequeño": 1,
      "Mediano": 2,
      "Grande": 3,
    },

    raza: {
      // 🐶 perros
      "Labrador Retriever": 1,
      "Pastor Alemán": 2,
      "Golden Retriever": 3,
      "Bulldog Inglés": 4,
      "Poodle": 5,
      "Beagle": 6,
      "Rottweiler": 7,
      "Yorkshire Terrier": 8,
      "Boxer": 9,
      "Dachshund": 10,
      "Chihuahua": 11,
      "Border Collie": 12,
      "Husky Siberiano": 13,
      "Shih Tzu": 14,
      "Cocker Spaniel": 15,

      // 🐱 gatos
      "Siamés": 16,
      "Persa": 17,
      "Maine Coon": 18,
      "Bengalí": 19,
      "Sphynx": 20,
      "Ragdoll": 21,
      "British Shorthair": 22,
      "Scottish Fold": 23,
      "Abisinio": 24,
      "Azul Ruso": 25,
    }

  };

  static toPersistence(pet: Pet) {
    const data = pet.toPrimitives();
    const c = this.catalogs;

    const tipoId = c.tipo[data.tipo];
    const razaId = c.raza[data.raza];
    const comunaId = c.comuna[data.comuna];
    const sexoId = c.sexo[data.genre];
    const estadoId = c.estado[data.estado ?? "Disponible"];
    const sizeId = c.size[data.size];

    if (
      tipoId === undefined ||
      razaId === undefined ||
      comunaId === undefined ||
      sexoId === undefined ||
      estadoId === undefined ||
      sizeId === undefined
    ) {
      throw new Error("Error mapeando catálogos");
    }

    return {
      mascota: {
        id_mascota: data.id,
        nombre: data.name,
        edad: data.age,
        nivel_energia: data.energy_level,
        descripcion: data.description,
        descripcion_salud: data.health_description,
        fecha_publicacion: data.createdAt,
        id_refugio: data.id_refugio,

        id_tipo_mascota: tipoId,
        id_raza: razaId,
        id_comuna: comunaId,
        id_sexo: sexoId,
        id_estado_mascota: estadoId,
        id_size: sizeId,
      },

      caracter: data.personality
        ? {
            id_caracter: c.caracter[data.personality],
          }
        : null,
    };
  }
}