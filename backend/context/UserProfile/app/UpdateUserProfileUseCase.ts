
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthId } from "../../Auth/domain/AuthId";

import { ComunaType } from "../../Shared/ComunaType";
import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile } from "../domain/UserProfile";
import { RegionType } from "../../Shared/RegionType";

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

export class UpdateUserProfileUseCase {
  constructor(
    private userProfile: UserProfileRepository
  ) {}

  async execute(
    idAuth: string,
    name: string,
    img_url?: string,
    address?: string,
    telephone?: string,
    comuna?: string,
    description?: string,
    region?: string
  ): Promise<UserProfileType> {

    // 🔥 1. Value Object
    const idAuthObj = new AuthId(idAuth);

    // 🔥 2. Buscar usuario
    const user = await this.userProfile.findByAuthId(idAuthObj);

    if (!user) {
      throw new ValidateDomainError("Usuario no encontrado");
    }

    // 🔥 3. Crear nueva entidad (inmutable)
    const newUser = UserProfile.fromPrimitives({
      ...user.toPrimitives(),
      name,
      address: address ?? null,
      telephone: telephone ?? null,
      description: description ?? null,
      comuna: (comuna as ComunaType) ?? null,
      region: (region as RegionType) ?? null,
    img_url: img_url ?? null,
      
    });

    // 🔥 4. (Opcional) Validación de nombre único
    const nameExisting = await this.userProfile.findByName(newUser.getName());

    if (nameExisting && nameExisting.toPrimitives().authId !== idAuth) {
      throw new ValidateDomainError("El nombre ya está en uso");
    }

    newUser.updateTimestamp();
    // 🔥 5. Persistir
    await this.userProfile.update(newUser);

    // 🔥 6. Retornar DTO limpio
    const userData = newUser.toPrimitives();

    return {
      ...userData,
      address: userData.address ?? undefined,
      telephone: userData.telephone ?? undefined,
      description: userData.description ?? undefined,
      img_url: userData.img_url ?? undefined,
      comuna: userData.comuna ?? undefined,
      region: userData.region ?? undefined,
    };
  }
}