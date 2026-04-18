import { PetAge } from "./PetAge";
import { PetBreed } from "./PetBreed";
import { PetDescription } from "./PetDescription";
import { PetEnergyLevel } from "./PetEnergyLevel";
import { PetGenre } from "./PetGenre";
import { PetId } from "./PetId";
import { PetIdRefugio } from "./PetIdRefugio";
import { PetName } from "./PetName";
import { PetState } from "./PetState";
import { PetType } from "./PetType";
import { PetCreatedAt } from "./PetCreatedAt";
import { PetHealthDescription } from "./PetHealthDescription";
import { PetSize } from "./PetSize";
import { PetUpdatedAt } from "./PetUpdatedAt";
import { PetImages } from "./PetImages";
import { ComunaId } from "../../Comuna/ComunaId";


export class Pet {

    constructor(
        private readonly id: PetId,
        private readonly id_refugio: PetIdRefugio,
        private readonly raza: PetBreed,
        private readonly estado: PetState,
        private readonly comuna : ComunaId,
        private readonly createdAt: PetCreatedAt,
        private readonly name: PetName,
        private readonly energy_level: PetEnergyLevel,
        private readonly age?: PetAge,
        private readonly genre?: PetGenre,
        private readonly size?: PetSize,
        private readonly description?: PetDescription,
        private readonly health_description?: PetHealthDescription,
        private readonly images?: PetImages,
        private readonly updatedAt?: PetUpdatedAt,
    ){}



}