import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioRepository } from "../../Refugio/domain/RefugioRepository";

import { PetRepository } from "../domain/PetRepository";
import { Pet } from "../domain/Pet";
import { PetIdRefugio } from "../domain/PetIdRefugio";
import { PetName } from "../domain/PetName";
import { PetType, PetTypeType } from "../domain/PetType";
import { PetBreed, PetBreedType } from "../domain/PetBreed";
import { PetComuna, PetComunaType } from "../domain/PetComuna";
import { PetEnergyLevel } from "../domain/PetEnergyLevel";
import { PetAge } from "../domain/PetAge";
import { PetGenre, PetGenreType } from "../domain/PetGenre";
import { PetDescription } from "../domain/PetDescription";
import { PetSize, PetSizeType } from "../domain/PetSize";
import { PetHealthDescription } from "../domain/PetHealthDescription";
import { PetImages } from "../domain/PetImages";
import { PetImageUrl } from "../domain/PetImageUrl";
import { PetPersonality, PetPersonalityType } from "../domain/PetPersonality";


type command = {
    name: string;
    breed: string;
    age: number;
    type: string;
    genre: string;
    comuna: string;
    caracter: string;
    energy_level: string;
    size: string;
    health_description: string;
    description: string;
    images?: string[]; 
}

export class SavePetUseCase {

    constructor(
        private petRepository: PetRepository,
        private refugioRepository: RefugioRepository
    ) {}

    async execute(data: command, authId: string): Promise<void> {

        const refugio = await this.refugioRepository.findByAuthId(new AuthId(authId));
        if (!refugio) {
            throw new ValidateDomainError("Refugio no encontrado para el usuario autenticado");
        }

        console.log(data.images, "🔥 Imágenes recibidas en UseCase");

        const petEntity = Pet.create(
            new PetIdRefugio(refugio.getId().getValue()),
            new PetType(data.type as PetTypeType),
            new PetBreed(data.breed as PetBreedType),
            new PetComuna(data.comuna as PetComunaType),
            new PetName(data.name),
            new PetEnergyLevel(parseInt(data.energy_level)),
            new PetPersonality(data.caracter as PetPersonalityType),
            new PetAge(data.age),
            new PetGenre(data.genre as PetGenreType),
            new PetSize(data.size as PetSizeType),
            new PetDescription(data.description),
            new PetHealthDescription(data.health_description),
            data.images ? new PetImages(data.images.map(url => new PetImageUrl(url))) : undefined
        );


        

        await this.petRepository.save(petEntity);
        if (data.images && data.images.length > 0) {
            for (const imageUrl of data.images) {
                await this.petRepository.saveImages(petEntity.getId(), imageUrl);
            }
        }
    }
}