import {UUIDType, UUIDSchema} from "../../Shared/UUIDType";

export class ApplicationId {

    constructor(
         readonly value: UUIDType,
    ){

        ApplicationId.validate(value);
    }

    static validate(value: string): void {
       UUIDSchema.parse(value);
        
    }

    static create(): ApplicationId {
        const uuid = crypto.randomUUID();
        return new ApplicationId(uuid);
    }

    getValue(): UUIDType {
        return this.value;
    }

    
}

