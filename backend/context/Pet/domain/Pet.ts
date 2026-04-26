import { PetAge } from "./PetAge";
import { PetBreed, PetBreedType } from "./PetBreed";
import { PetComuna, PetComunaType } from "./PetComuna";
import { PetDescription } from "./PetDescription";
import { PetEnergyLevel } from "./PetEnergyLevel";
import { PetGenre, PetGenreType } from "./PetGenre";
import { PetId } from "./PetId";
import { PetIdRefugio } from "./PetIdRefugio";
import { PetName } from "./PetName";
import { PetState, PetStateType } from "./PetState";
import { PetType, PetTypeType } from "./PetType";
import { PetCreatedAt } from "./PetCreatedAt";
import { PetHealthDescription } from "./PetHealthDescription";
import { PetSize, PetSizeType } from "./PetSize";
import { PetUpdatedAt } from "./PetUpdatedAt";
import { PetImages } from "./PetImages";
import { PetImageUrl } from "./PetImageUrl";
import { generateUUID } from "@/backend/utils/generateUUID";
import { PetPersonality, PetPersonalityType } from "./PetPersonality";

type PetPrimitives = {
    id: string,
    id_refugio: string,
    tipo: string,
    raza: string,
    estado: string,
    comuna : string,
    createdAt: string,
    name: string,
    energy_level: number,
    age: number,
    genre: string,
    size: string,
    description: string,
    health_description: string,
    images?: string[],
    personality: string,
    updatedAt?: string
}


export class Pet {

    constructor(
        private readonly id: PetId,
        private readonly id_refugio: PetIdRefugio,
        private readonly tipo: PetType,
        private readonly raza: PetBreed,
        private readonly estado: PetState,
        private readonly comuna : PetComuna,
        private readonly createdAt: PetCreatedAt,
        private readonly name: PetName,
        private readonly energy_level: PetEnergyLevel,
        private readonly personality?: PetPersonality,
        private readonly age?: PetAge,
        private readonly genre?: PetGenre,
        private readonly size?: PetSize,
        private readonly description?: PetDescription,
        private readonly health_description?: PetHealthDescription,
        private readonly images?: PetImages,
        private readonly updatedAt?: PetUpdatedAt,
    ){}


        static create(
            id_refugio: PetIdRefugio,
            tipo: PetType,
            raza: PetBreed,
            comuna : PetComuna,
            name: PetName,
            energy_level: PetEnergyLevel,
            personality: PetPersonality,
            age: PetAge,
            genre: PetGenre,
            size: PetSize,
            description: PetDescription,
            health_description: PetHealthDescription,
            images?: PetImages,
            updatedAt?: PetUpdatedAt,
        ): Pet {
            const id = new PetId(generateUUID());
            const createdAt = new PetCreatedAt(new Date());
            const estado = PetState.createAvailable();

            return new Pet(
                id, 
                id_refugio,
                tipo,
                raza,
                estado,
                comuna,
                createdAt,
                name,
                energy_level,
                personality,
                age,
                genre,
                size,
                description,
                health_description,
                images ,
                updatedAt
            );
        }

        static fromPrimitives(primitives: PetPrimitives): Pet {

            return new Pet(
                new PetId(primitives.id),
                new PetIdRefugio(primitives.id_refugio),
                new PetType(primitives.tipo as PetTypeType),
                new PetBreed(primitives.raza as PetBreedType),
                new PetState(primitives.estado as PetStateType),
                new PetComuna(primitives.comuna as PetComunaType),
                new PetCreatedAt(new Date(primitives.createdAt)),
                new PetName(primitives.name),
                new PetEnergyLevel(primitives.energy_level),
                primitives.personality ? new PetPersonality(primitives.personality as PetPersonalityType) : undefined,
                primitives.age ? new PetAge(primitives.age) : undefined,
                primitives.genre ? new PetGenre(primitives.genre as PetGenreType) : undefined,
                primitives.size ? new PetSize(primitives.size as PetSizeType) : undefined,
                primitives.description ? new PetDescription(primitives.description) : undefined,
                primitives.health_description ? new PetHealthDescription(primitives.health_description) : undefined,
                primitives.images ? new PetImages(primitives.images.map(img => new PetImageUrl(img))) : undefined,
                primitives.updatedAt ? new PetUpdatedAt(new Date(primitives.updatedAt)) : undefined
            );
        }

        toPrimitives(): PetPrimitives {
  return {
    id: this.id.getValue(),
    id_refugio: this.id_refugio.getValue(),

    tipo: this.tipo.getValue(),
    raza: this.raza.getValue(),
    estado: this.estado.getValue(),

    comuna: this.comuna.getValue(),
    createdAt: this.createdAt.getValue().toISOString(),

    name: this.name.getValue(),
    energy_level: this.energy_level.getValue(),

    // ✅ obligatorios
    age: this.age!.getValue(),
    genre: this.genre!.getValue(),
    size: this.size!.getValue(),
    description: this.description!.getValue(),
    health_description: this.health_description!.getValue(),
    personality: this.personality!.getValue(),

    // ✅ opcionales reales
    images: this.images
      ? this.images.getAllImages().map(img => img.getValue())
      : [],

    updatedAt: this.updatedAt
      ? this.updatedAt.getValue().toISOString()
      : undefined
  };
}

update(data: Partial<PetPrimitives>): Pet {
  return new Pet(
    this.id,
    this.id_refugio,
    data.tipo ? new PetType(data.tipo as PetTypeType) : this.tipo,
    data.raza ? new PetBreed(data.raza as PetBreedType) : this.raza,
    this.estado,
    data.comuna ? new PetComuna(data.comuna as PetComunaType) : this.comuna,
    this.createdAt,
    new PetName(data.name ?? this.name.getValue()),
    new PetEnergyLevel(data.energy_level ?? this.energy_level.getValue()),
    data.personality ? new PetPersonality(data.personality as PetPersonalityType) : this.personality,
    data.age ? new PetAge(data.age) : this.age,
    data.genre ? new PetGenre(data.genre as PetGenreType) : this.genre,
    data.size ? new PetSize(data.size as PetSizeType) : this.size,
    data.description ? new PetDescription(data.description) : this.description,
    data.health_description ? new PetHealthDescription(data.health_description) : this.health_description,
    new PetImages(
        (data.images ?? this.getImages()?.getAllImages().map(i => i.getValue()) ?? [])
        .map(img => new PetImageUrl(img))
    ),
    new PetUpdatedAt(new Date()),
);
}

getRefugioId(): PetIdRefugio {
    return this.id_refugio;
}

getId(): PetId {
    return this.id;
}

getTipo(): PetType {
    return this.tipo;       


}
getRaza(): PetBreed {
    return this.raza;
}

getEstado(): PetState {
    return this.estado;
}

getComuna(): PetComuna {
    return this.comuna;
}

getCreatedAt(): PetCreatedAt {
    return this.createdAt;
}

getName(): PetName {
    return this.name;
}

getEnergyLevel(): PetEnergyLevel {
    return this.energy_level;
}

getPersonality(): PetPersonality | undefined {
    return this.personality;
}

getAge(): PetAge | undefined {
    return this.age;
}

getGenre(): PetGenre | undefined {
    return this.genre;
}

getSize(): PetSize | undefined {
    return this.size;
}

getDescription(): PetDescription | undefined {
    return this.description;
}

getHealthDescription(): PetHealthDescription | undefined {
    return this.health_description;
}

getImages(): PetImages | undefined {
    return this.images;
}

getUpdatedAt(): PetUpdatedAt | undefined {
    return this.updatedAt;
}


}