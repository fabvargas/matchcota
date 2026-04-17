import { DateSchema, DateType } from "../../Shared/DateType";

export class PetUpdatedAt {

    constructor(
        private readonly value: DateType,
    ){

        PetUpdatedAt.validate(value);
    }

    static validate(value: Date): void {
       DateSchema.parse(value);
        
    }

    static create(): PetUpdatedAt {
        return new PetUpdatedAt(new Date());
    }

    getValue(): DateType {
        return this.value;
    }

    
}