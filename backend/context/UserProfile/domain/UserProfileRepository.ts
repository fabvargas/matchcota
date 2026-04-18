import { UserProfile } from "./UserProfile";
import { UserProfileName } from "./UserProfileName";

export interface UserProfileRepository {
  save(userProfile: UserProfile): Promise<void>;
  findById(id: string): Promise<UserProfile | null>;
  findByName(name: UserProfileName): Promise<UserProfile | null>;
}