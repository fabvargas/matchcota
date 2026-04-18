
import {z} from "zod";
import {parseSchema} from "@/backend/utils/parseSchema";


export const RolNameType = z.enum(["adoptante", "refugio"], { message: "Role name must be either 'adoptante' or 'refugio'" });
export type RolNameType = z.infer<typeof RolNameType>;

export class RolName {
    constructor(
        private readonly value: RolNameType
    ){
        RolName.validate(value);
    }

    static validate(data: unknown): void {
        parseSchema(RolNameType, data);
    }

    getValue(): RolNameType {
        return this.value;
    }
}

