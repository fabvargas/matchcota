import { UUIDType, UUIDSchema } from "../../Shared/UUIDType";

export class PetIdRefugio {

    constructor(
        private readonly value: UUIDType,
    ){

        PetIdRefugio.validate(value);
    }

    static validate(value: string): void {
       UUIDSchema.parse(value);
        
    }

    getValue(): UUIDType {
        return this.value;
    }

    
}