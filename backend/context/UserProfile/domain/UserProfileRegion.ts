
import { RegionSchema, RegionType }from "@/backend/context/Shared/RegionType";
import {parseSchema} from "@/backend/utils/parseSchema";



const UserProfileRegionSchema = RegionSchema;

export class UserProfileRegion {

    constructor(
        public value: RegionType
    ) {
       UserProfileRegion.validate(value);
    }

    static validate(value: string): void {
        parseSchema(UserProfileRegionSchema, value);
    }

    getValue(): RegionType {
        return this.value;
    }
}

