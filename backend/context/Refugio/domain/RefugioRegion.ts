
import { RegionSchema, RegionType }from "@/backend/context/Shared/RegionType";
import {parseSchema} from "@/backend/utils/parseSchema";


const RefugioRegionSchema = RegionSchema;

export class RefugioRegion {

    constructor(
        public value: RegionType
    ) {
       RefugioRegion.validate(value);
    }

    static validate(value: string): void {
        parseSchema(RefugioRegionSchema, value);
    }

    getValue(): RegionType {
        return this.value;
    }
}

