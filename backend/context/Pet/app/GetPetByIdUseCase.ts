import { RefugioId } from "../../Refugio/domain/RefugioId";
import { RefugioRepository } from "../../Refugio/domain/RefugioRepository";
import { PetId } from "../domain/PetId";
import { PetRepository } from "../domain/PetRepository";



export class GetPetByIdUseCase {

    constructor(
        private petRepository: PetRepository,
        private refugioRepository: RefugioRepository
    ) {

    }

async execute(id: string) {
  const result = await this.petRepository.findById(new PetId(id));
  if (!result) return null;

  const refugio = await this.refugioRepository.findById(
    new RefugioId(result.getRefugioId().getValue())
  );
  if (!refugio) return null;
  
const comunaValue = refugio.getComuna()?.getValue() ?? "Desconocida";
const codigoPostalValue = refugio.getCodigoPostal()?.getValue() ?? "Desconocido";

const petWithRefugio = {
  ...result.toPrimitives(),
  refugioName: refugio.getName().getValue(),
  refugioComunas: comunaValue,
  refugioCodigoPostal: codigoPostalValue,
  RefugioId: refugio.getId().getValue(),
};

  return petWithRefugio;
}

}