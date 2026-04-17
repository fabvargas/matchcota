import { DateSchema, DateType } from "../../Shared/DateType";

export class PetCreatedAt {

    constructor(
        private readonly value: DateType,
    ){

        PetCreatedAt.validate(value);
    }

    static validate(value: Date): void {
       DateSchema.parse(value);
        
    }

    static create(): PetCreatedAt {
        return new PetCreatedAt(new Date());
    }

    getValue(): DateType {
        return this.value;
    }



    
}