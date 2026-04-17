import { UserProfileId } from "./UserProfileId";
import { UserProfileName } from "./UserProfileName";
import { UserProfileComuna } from "./UserProfleComuna";
import { UserProfileTelephone } from "./UserProfileTelephone";
import { UserProfileAddress } from "./UserProfileAddress";
import { ComunaType } from "../../Shared/ComunaType";
import { AuthId } from "../../Auth/domain/AuthId";
import { UserProfileImgUrl } from "./UserProfileImgUrl";
import { UserProfileUpdatedAt } from "./UserProfileUpdatedAt";
import { UserProfileDescription } from "./UserProfileDescription";


export class UserProfile{

    private constructor(
        private readonly id:UserProfileId,
        private readonly authId:AuthId,
        private readonly name:UserProfileName,
        private readonly telephone?:UserProfileTelephone,
        private readonly address?:UserProfileAddress,
        private readonly img_url?: UserProfileImgUrl,
        private readonly description?: UserProfileDescription,
        private readonly comuna?:UserProfileComuna,
        private readonly updateAt?: UserProfileUpdatedAt,
    ){}

    static  create(
        authId :AuthId,
        name:UserProfileName,
        telephone?:UserProfileTelephone,
        address?:UserProfileAddress,
        comuna?:UserProfileComuna,
        img_url?: UserProfileImgUrl,
        description?: UserProfileDescription,
        updateAt?: UserProfileUpdatedAt

    ): UserProfile {
        const id =  UserProfileId.create();
        return new UserProfile(id, authId, name, telephone, address, img_url, description, comuna, updateAt);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            name: this.name.getValue(),
            telephone: this.telephone?.getValue() || null,
            address: this.address?.getValue() || null,
            comuna: this.comuna?.getValue() || null,
            img_url: this.img_url?.getValue() || null,
            description: this.description?.getValue() || null,
            updateAt: this.updateAt?.getValue() || null

        }
    }

    static fromPrimitives(primitives: {
        id: string,
        authId: string,
        name: string,
        telephone: string | null,
        address: string | null,
        comuna: ComunaType | null,
        img_url: string | null,
        description: string | null,
        updateAt: Date | null
    }): UserProfile {
        return new UserProfile(
            new UserProfileId(primitives.id),
            new AuthId(primitives.authId),
            new UserProfileName(primitives.name),
            primitives.telephone ? new UserProfileTelephone(primitives.telephone) : undefined,
            primitives.address ? new UserProfileAddress(primitives.address) : undefined,
            primitives.img_url ? new UserProfileImgUrl(primitives.img_url) : undefined,
            primitives.description ? new UserProfileDescription(primitives.description) : undefined,
            primitives.comuna ? new UserProfileComuna(primitives.comuna) : undefined,
            primitives.updateAt ? new UserProfileUpdatedAt(primitives.updateAt) : undefined
        );
    }
}