import { Refugio } from "./Refugio";
import { RefugioId } from "./RefugioId";
import { RefugioName } from "./RefugioName";
import { AuthId } from "../../Auth/domain/AuthId";

export interface RefugioRepository {
  save(refugio: Refugio): Promise<void>;

  findByAuthId(authId: AuthId): Promise<Refugio | null>;

  findByName(name: RefugioName): Promise<Refugio | null>;

  update(refugio: Refugio): Promise<void>;

}