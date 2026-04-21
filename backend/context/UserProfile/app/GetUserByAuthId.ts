
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { UserProfileRepository } from "../domain/UserProfileRepository";
import { ComunaType } from "../../Shared/ComunaType";
import { AuthId } from "../../Auth/domain/AuthId";

export class GetUserByAuthId {

  constructor(
    private userProfileRepository: UserProfileRepository,
  ) {}

  async execute(
    authId: string
  ): Promise<UserProfileType> {

    const userProfile = await this.userProfileRepository.findByAuthId(new AuthId(authId));
  
    if (!userProfile) {
        throw new ValidateDomainError("Usuario no encontrado");
    }

    const userProfileData = userProfile.toPrimitives();
    return {
        ...userProfileData,
        address: userProfileData.address ?? undefined,
        telephone: userProfileData.telephone ?? undefined,
        description: userProfileData.description ?? undefined,
        img_url: userProfileData.img_url ?? undefined,
        comuna: userProfileData.comuna ?? undefined,
        region: userProfileData.region ?? undefined
    };
  }

}

type UserProfileType = {
  id: string;
  authId: string;
  name: string;
  img_url?: string;
  address?: string;
  telephone?: string;
  description?: string;
  comuna?: ComunaType;
  region?: string;
};