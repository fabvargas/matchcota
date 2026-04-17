import { ComunaSchema, ComunaType } from "../../Shared/ComunaType";

export class PetComuna {

    constructor(
        private readonly value: ComunaType,
    ){

        PetComuna.validate(value);
    }

    static validate(value: string): void {
       ComunaSchema.parse(value);
        
    }

    getValue(): ComunaType {
        return this.value;
    }

    
}