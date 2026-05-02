import {z} from "zod";
import { parseSchema } from  "@/backend/utils/parseSchema";

export const ApplicationStateSchema = z.object({
  state: z.enum(["disponible",  "adoptado"]),
});



export class ApplicationState {

    constructor(
        private readonly value: string
    ) {
        ApplicationState.validate(value);
    }

    getValue() {
        return this.value;
    }

    static validate(value:string): void{
        parseSchema(ApplicationStateSchema, { state: value });
    }

    static createDisponible(): ApplicationState {
        return new ApplicationState("disponible");
    }

    static createAdoptado(): ApplicationState {
        return new ApplicationState("adoptado");
    }
}
