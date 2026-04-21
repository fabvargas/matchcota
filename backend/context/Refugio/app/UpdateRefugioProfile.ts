import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioRepository } from "../domain/RefugioRepository";
import { Refugio } from "../domain/Refugio";
import { ComunaType } from "../../Shared/ComunaType";
import { RegionType } from "../../Shared/RegionType";


 type RefugioProfileType = {
    id: string,
    authId: string,
    name: string,
    img_url: string | undefined,
    address: string | undefined,
    telephone: string | undefined,
    description: string | undefined,
    comuna: ComunaType | undefined,
    region: string | undefined,
    codigoPostal: string | undefined
}




export class UpdateRefugioProfileUseCase {

    constructor(
       private refugioRepository: RefugioRepository
    ){}

    async execute(
        idAuth: string,
        name: string,
        address?: string,
        telephone?: string,
        description?: string,
        imagen_url?: string,
        comuna?: string,
        region?: string,
        codigoPostal?: string
    ): Promise<RefugioProfileType> {

        const idAuthObj = new AuthId(idAuth);
      
        const refugio = await this.refugioRepository.findByAuthId(idAuthObj);

        if (!refugio) {
            throw new ValidateDomainError("Refugio no encontrado");
        }

        const newRefugio = Refugio.fromPrimitives({
            ...refugio.toPrimitives(),
            name,
            address : address ?? null,
            telephone: telephone ?? null,
            description: description ?? null,
            img_url: imagen_url ?? null,
            comuna: comuna as ComunaType ?? null,
            codigoPostal: codigoPostal ?? null,
            region: region as RegionType ?? null
        });

        const nameExisting = await this.refugioRepository.findByName(newRefugio.getName());

        if (
        nameExisting &&
        nameExisting.toPrimitives().authId !== idAuthObj.getValue()
        ) {
        throw new ValidateDomainError("El nombre del refugio ya está en uso");
        }



        await this.refugioRepository.update(newRefugio);

        const refugioData = newRefugio.toPrimitives();
        return {
            ...refugioData,
            address: refugioData.address ?? undefined,
            telephone: refugioData.telephone ?? undefined,
            description: refugioData.description ?? undefined,
            img_url: refugioData.img_url ?? undefined,
            codigoPostal: refugioData.codigoPostal ?? undefined,
            comuna: refugioData.comuna ?? undefined,
            region: refugioData.region ?? undefined

        };

    }

}