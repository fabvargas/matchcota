import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { RefugioRepository } from "../domain/RefugioRepository";
import { AuthId } from "../../Auth/domain/AuthId";
import { ComunaType } from "../../Shared/ComunaType";

export class GetRefugioByAuthId {

  constructor(
    private refugioRepository: RefugioRepository,
  ) {}

  async execute(
    idAuth: string
  ): Promise<RefugioType> {

    const refugio = await this.refugioRepository.findByAuthId(new AuthId(idAuth));
    
    if (!refugio) {
        throw new ValidateDomainError("Refugio no encontrado");
    }

    const refugioData = refugio.toPrimitives();
    return {
        ...refugioData,
        address: refugioData.address ?? undefined,
        telephone: refugioData.telephone ?? undefined,
        description: refugioData.description ?? undefined,
        img_url: refugioData.img_url ?? undefined,
        codigoPostal: refugioData.codigoPostal ?? undefined,
        comuna: refugioData.comuna ?? undefined
    };
  }
  
}

type RefugioType = {
  id: string,
  authId: string,
  name: string,
  img_url: string | undefined,
  address: string | undefined,
  telephone: string | undefined,
  description: string | undefined,
  comuna: ComunaType | undefined,
  codigoPostal: string | undefined
}