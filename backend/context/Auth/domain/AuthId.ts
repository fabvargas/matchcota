
import { generateUUID } from "@/backend/utils/generateUUID";
import { parseSchema } from "@/backend/utils/parseSchema";
import { UUIDType, UUIDSchema } from "../../Shared/UUIDType";

export class AuthId {
 
    constructor(
        private readonly value:UUIDType,
    ){
       AuthId.validate(value);
    }

    static  validate(value: unknown): void {
         parseSchema(UUIDSchema, value);
        
    }

    static create(): AuthId {
        const id = generateUUID();
        return new AuthId(id);
    }

    getValue(): string {
        return this.value;
    }

    

}