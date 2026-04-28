import { AuthId } from "../../Auth/domain/AuthId";
import { AuthRepository } from "../../Auth/domain/AuthRepository";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { RefugioRepository } from "../../Refugio/domain/RefugioRepository";
import { PetRepository } from "../domain/PetRepository";

export class GetPetByRefugioIdUseCase {
    constructor(private petRepository: PetRepository,
        private authRepository: AuthRepository,
        private refugioRepository: RefugioRepository
    ) {}

    async execute(refugioId: string) {
        const auth = await this.authRepository.findById(new AuthId(refugioId));
        if (!auth) {
            throw new Error("Refugio no encontrado");
        }
        
        const refugio = await this.refugioRepository.findByAuthId(new AuthId(refugioId));
        if (!refugio) {
            throw new Error("Refugio no encontrado");
        }



        const pets = await this.petRepository.findByRefugioId(refugio.getId());
        return pets.map(pet => pet.toPrimitives());
    }
}