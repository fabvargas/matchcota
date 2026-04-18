import { RolName } from "./RolName";
import { RolId } from "./RolId";

export class Rol {

    constructor(
        private readonly id: RolId,
        private readonly name: RolName
    ){}

    getId(): RolId {
        return this.id;
    }

    getName(): RolName {
        return this.name;
    }
}