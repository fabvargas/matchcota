import { UserProfileId } from "./UserProfileId";
import { UserProfileName } from "./UserProfileName";
import { UserProfileTelephone } from "./UserProfileTelephone";
import { UserProfileAddress } from "./UserProfileAddress";
import { AuthId } from "../../Auth/domain/AuthId";
import { UserProfileImgUrl } from "./UserProfileImgUrl";
import { UserProfileUpdatedAt } from "./UserProfileUpdatedAt";
import { UserProfileDescription } from "./UserProfileDescription";
import { ComunaId } from "../../Comuna/ComunaId";


export class UserProfile{

    private constructor(
        private readonly id:UserProfileId,
        private readonly authId:AuthId,
        private readonly name:UserProfileName,
        private readonly telephone?:UserProfileTelephone,
        private readonly address?:UserProfileAddress,
        private readonly img_url?: UserProfileImgUrl,
        private readonly description?: UserProfileDescription,
        private readonly comunaId?:ComunaId,
        private readonly updatedAt?: UserProfileUpdatedAt,
    ){}

    static  create(
        authId :AuthId,
        name:UserProfileName,
        telephone?:UserProfileTelephone,
        address?:UserProfileAddress,
        comuna?:ComunaId,
        img_url?: UserProfileImgUrl,
        description?: UserProfileDescription,
        updatedAt?: UserProfileUpdatedAt

    ): UserProfile {
        const id =  UserProfileId.create();
        return new UserProfile(id, authId, name, telephone, address, img_url, description, comuna, updatedAt);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            name: this.name.getValue(),
            telephone: this.telephone?.getValue() || null,
            address: this.address?.getValue() || null,
            comunaId: this.comunaId?.getValue() || null,
            img_url: this.img_url?.getValue() || null,
            description: this.description?.getValue() || null,
            updatedAt: this.updatedAt?.getValue() || null

        }
    }

    static fromPrimitives(primitives: {
        id: string,
        authId: string,
        name: string,
        telephone: string | null,
        address: string | null,
        comunaId: number | null,
        img_url: string | null,
        description: string | null,
        updatedAt: Date | null
    }): UserProfile {
        return new UserProfile(
            new UserProfileId(primitives.id),
            new AuthId(primitives.authId),
            new UserProfileName(primitives.name),
            primitives.telephone ? new UserProfileTelephone(primitives.telephone) : undefined,
            primitives.address ? new UserProfileAddress(primitives.address) : undefined,
            primitives.img_url ? new UserProfileImgUrl(primitives.img_url) : undefined,
            primitives.description ? new UserProfileDescription(primitives.description) : undefined,
            primitives.comunaId ? new ComunaId(primitives.comunaId) : undefined,
            primitives.updatedAt ? new UserProfileUpdatedAt(primitives.updatedAt) : undefined
        );
    }
}