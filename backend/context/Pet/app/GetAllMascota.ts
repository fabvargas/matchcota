
import { PetRepository } from "../domain/PetRepository";

export class GetAllMascotasUseCase {
    constructor(private petRepository: PetRepository,
     
    ) {}

    async execute() {
        const pets = await this.petRepository.findAll();
        return pets.map(pet => pet.toPrimitives());
    }

}