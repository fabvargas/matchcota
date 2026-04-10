import { UserProfileId } from "./UserProfileId";
import { UserProfileName } from "./UserProfileName";
import { UserProfileComuna } from "./UserProfleComuna";
import { UserProfileTelephone } from "./UserProfileTelephone";
import { UserProfileAddress } from "./UserProfileAddress";
import { ComunaType } from "../../Shared/ComunaType";
import { AuthId } from "../../Auth/domain/AuthId";


export class UserProfile{

    private constructor(
        private readonly id:UserProfileId,
        private readonly auth_id:AuthId,
        private readonly name:UserProfileName,
        private readonly telephone?:UserProfileTelephone,
        private readonly address?:UserProfileAddress,
        private readonly comuna?:UserProfileComuna,
    ){}

    static  create(
        auth_id:AuthId,
        name:UserProfileName,
        telephone?:UserProfileTelephone,
        address?:UserProfileAddress,
        comuna?:UserProfileComuna,
    ): UserProfile {
        const id =  UserProfileId.create();
        return new UserProfile(id, auth_id, name, telephone, address, comuna);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            auth_id: this.auth_id.getValue(),
            name: this.name.getValue(),
            telephone: this.telephone?.getValue() ?? null,
            address: this.address?.getValue() ?? null,
            comuna: this.comuna?.getValue() ?? null
        }
    }

    static fromPrimitives(primitives: {
        id: string,
        auth_id: string,
        name: string,
        telephone: string | null,
        address: string | null,
        comuna: ComunaType | null
    }): UserProfile {
        return new UserProfile(
            new UserProfileId(primitives.id),
            new AuthId(primitives.auth_id),
            new UserProfileName(primitives.name),
            primitives.telephone == null ? undefined : new UserProfileTelephone(primitives.telephone),
            primitives.address == null ? undefined : new UserProfileAddress(primitives.address),
            primitives.comuna == null ? undefined : new UserProfileComuna(primitives.comuna)
        );
    }
}