import { Refugio } from "./Refugio";
import { RefugioId } from "./RefugioId";
import { RefugioName } from "./RefugioName";

export interface RefugioRepository {
    save(refugio: Refugio): Promise<void>;
    findById(id: RefugioId): Promise<Refugio | null>;
    findByName(name: RefugioName): Promise<Refugio | null>;
}