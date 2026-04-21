import { AuthId } from "../../Auth/domain/AuthId";
import { UserProfile } from "./UserProfile";
import { UserProfileName } from "./UserProfileName";

export interface UserProfileRepository {
  save(userProfile: UserProfile): Promise<void>;
  findById(id: string): Promise<UserProfile | null>;
  findByName(name: UserProfileName): Promise<UserProfile | null>;
  findByAuthId(authId: AuthId): Promise<UserProfile | null>;
  
  update(userProfile: UserProfile): Promise<void>;
}