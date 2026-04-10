import { parseSchema } from "@/backend/utils/parseSchema";
import { DateType,DateSchema } from "../../Shared/DateType";


export class AuthDateCreated {

    constructor(
        private readonly value:DateType
    ){
       AuthDateCreated.validate(value);
    }

    static  validate(data: unknown): void {
        parseSchema(DateSchema, data);
        
    }

    static create(): AuthDateCreated {
        return new AuthDateCreated(new Date());
    }

    getValue(): Date  {
        return this.value;
    }

    

}