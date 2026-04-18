import { Refugio } from "./Refugio";
import { RefugioId } from "./RefugioId";
import { RefugioName } from "./RefugioName";
import { AuthId } from "../../Auth/domain/AuthId";

export interface RefugioRepository {
  save(refugio: Refugio): Promise<void>;

  findById(id: RefugioId): Promise<Refugio | null>;

  findByName(name: RefugioName): Promise<Refugio | null>;

}