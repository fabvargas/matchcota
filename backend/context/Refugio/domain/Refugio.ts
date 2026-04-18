import { RefugioId } from "./RefugioId";
import { RefugioDescription } from "./RefugioDescription";
import { RefugioName } from "./RefugioName";
import { RefugioAddress } from "./RefugioAddress";
import { RefugioCodigoPostal } from "./RefugioCodigoPostal";
import { RefugioTelephone } from "./RefugioTelephone";
import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioImgUrl } from "./RefugioImgUrl";
import { ComunaId } from "../../Comuna/ComunaId";

export class Refugio{

    private constructor(
        private readonly id:RefugioId,
        private readonly authId: AuthId,
        private readonly name:RefugioName,
        private readonly img_url?: RefugioImgUrl,
        private readonly address?:RefugioAddress,
        private readonly telephone?:RefugioTelephone,
        private readonly description?:RefugioDescription ,
        private readonly comuna?:ComunaId,
        private readonly codigoPostal?:RefugioCodigoPostal,
        private readonly updated_at?: Date,
    ){
        
    }

    static create(
        authId: AuthId,
        name:RefugioName,
        img_url?: RefugioImgUrl,
        address?:RefugioAddress,
        telephone?:RefugioTelephone,
        description?:RefugioDescription,
        comuna?:ComunaId,
        codigoPostal?:RefugioCodigoPostal,
        updated_at?: Date
    ): Refugio {
        const id =  RefugioId.create();
        return new Refugio( id, authId, name, img_url, address, telephone, description, comuna, codigoPostal, updated_at);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            name: this.name.getValue(),
            address: this.address?.getValue() || null,
            telephone: this.telephone?.getValue() || null,
            description: this.description?.getValue() || null,
            comunaId: this.comuna?.getValue() || null,
            codigoPostal: this.codigoPostal?.getValue() || null,
            img_url: this.img_url?.getValue() || null,
            updatedAt: this.updated_at || null

        }
    }

    static fromPrimitives(primitives: {
        id: string,
        authId: string,
        name: string,
        address: string | null,
        telephone: string | null,
        description: string | null  ,
        comunaId: number | null,
        codigoPostal: string | null,
        img_url: string | null,
        updatedAt: Date | null

    }): Refugio {
        return new Refugio(
            new RefugioId(primitives.id),
            new AuthId(primitives.authId),
            new RefugioName(primitives.name),
            primitives.img_url == null ? undefined : new RefugioImgUrl(primitives.img_url),
            primitives.address == null ? undefined : new RefugioAddress(primitives.address),
            primitives.telephone == null ? undefined : new RefugioTelephone(primitives.telephone),
            primitives.description == null ? undefined : new RefugioDescription(primitives.description),
            primitives.comunaId == null ? undefined : new ComunaId(primitives.comunaId),
            primitives.codigoPostal == null ? undefined : new RefugioCodigoPostal(primitives.codigoPostal),
            primitives.updatedAt == null ? undefined : new Date(primitives.updatedAt)

        )
    }
}