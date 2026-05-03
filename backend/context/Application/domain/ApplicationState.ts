import {z} from "zod";
import { parseSchema } from  "@/backend/utils/parseSchema";

export const ApplicationStateSchema = z.object({
  state: z.enum(["Pendiente",  "Aprobado", "Rechazado"]),
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

    static createPendiente(): ApplicationState {
        return new ApplicationState("Pendiente");
    }

    static createAprobado(): ApplicationState {
        return new ApplicationState("Aprobado");
    }

    static createRechazado(): ApplicationState {
        return new ApplicationState("Rechazado");
    }

}
