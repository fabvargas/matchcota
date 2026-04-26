import { RefugioId } from "../../Refugio/domain/RefugioId";
import { Pet } from "./Pet";
import { PetBreed } from "./PetBreed";
import { PetComuna } from "./PetComuna";
import { PetId } from "./PetId";
import { PetType } from "./PetType";

export interface PetRepository {
    save(pet: Pet): Promise<void>;
    findById(id: PetId): Promise<Pet | null>;
    findAll(): Promise<Pet[]>;
    findByRefugioId(refugioId: RefugioId): Promise<Pet[]>;
    update(pet: Pet): Promise<void>;
    deleteById(id: PetId): Promise<void>;
}