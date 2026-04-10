import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthEmailSchema = z
  .email('Invalid email format')
  .min(1, 'Email is required')
  .max(100, 'Email must be at most 100 characters');


export type AuthEmailType = z.infer<typeof AuthEmailSchema>;


export class AuthEmail {

    constructor(
        private readonly value:AuthEmailType
    ){
        AuthEmail.validate(value);
    }

    static  validate(value: unknown): void {
         parseSchema(AuthEmailSchema, value);
        
    }

    getValue(): string {
        return this.value;
    }

}