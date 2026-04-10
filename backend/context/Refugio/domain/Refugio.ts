import { RefugioId } from "./RefugioId";
import { RefugioDescription } from "./RefugioDescription";
import { RefugioName } from "./RefugioName";
import { RefugioAddress } from "./RefugioAddress";
import { RefugioCodigoPostal } from "./RefugioCodigoPostal";
import { RefugioComuna } from "./RefugioComuna";
import { RefugioTelephone } from "./RefugioTelephone";
import { ComunaType } from "../../Shared/ComunaType";
import { AuthId } from "../../Auth/domain/AuthId";

export class Refugio{

    private constructor(
        private readonly id:RefugioId,
        private readonly authId: AuthId,
        private readonly name:RefugioName,
        private readonly address?:RefugioAddress,
        private readonly telephone?:RefugioTelephone,
        private readonly description?:RefugioDescription ,
        private readonly comuna?:RefugioComuna,
        private readonly codigoPostal?:RefugioCodigoPostal,
    ){
        
    }

    static create(
        authId: AuthId,
        name:RefugioName,
        address?:RefugioAddress,
        telephone?:RefugioTelephone,
        description?:RefugioDescription,
        comuna?:RefugioComuna,
        codigoPostal?:RefugioCodigoPostal,
    ): Refugio {
        const id =  RefugioId.create();
        return new Refugio( id, authId, name, address, telephone, description, comuna, codigoPostal);
    }


    getComunas(): string[] {
        return this.comuna?.getComunas() || [];
    }

    isComuna(value: string): boolean {
        return this.comuna?.isComuna(value) || false;
    }


    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            name: this.name.getValue(),
            address: this.address?.getValue() || null,
            telephone: this.telephone?.getValue() || null,
            description: this.description?.getValue() || null,
            comuna: this.comuna?.getValue() || null,
            codigoPostal: this.codigoPostal?.getValue() || null
        }
    }

    static fromPrimitives(primitives: {
        id: string,
        authId: string,
        name: string,
        address: string | null,
        telephone: string | null,
        description: string | null  ,
        comuna: ComunaType | null,
        codigoPostal: string | null
    }): Refugio {
        return new Refugio(
            new RefugioId(primitives.id),
            new AuthId(primitives.authId),
            new RefugioName(primitives.name),
            primitives.address == null ? undefined : new RefugioAddress(primitives.address),
            primitives.telephone == null ? undefined : new RefugioTelephone(primitives.telephone),
            primitives.description == null ? undefined : new RefugioDescription(primitives.description),
            primitives.comuna == null ? undefined : new RefugioComuna(primitives.comuna),
            primitives.codigoPostal == null ? undefined : new RefugioCodigoPostal(primitives.codigoPostal)
        )
    }
}