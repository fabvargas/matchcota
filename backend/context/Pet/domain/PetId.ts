import {UUIDType, UUIDSchema} from "../../Shared/UUIDType";

export class PetId {

    constructor(
        private readonly value: UUIDType,
    ){

        PetId.validate(value);
    }

    static validate(value: string): void {
       UUIDSchema.parse(value);
        
    }

    static create(): PetId {
        const uuid = crypto.randomUUID();
        return new PetId(uuid);
    }

    getValue(): UUIDType {
        return this.value;
    }

    
}

