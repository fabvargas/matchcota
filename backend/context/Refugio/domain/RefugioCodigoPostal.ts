import {z} from 'zod';
import {parseSchema} from '@/backend/utils/parseSchema';

export const RefugioCodigoPostalSchema = z
.string({message: "Invalid Codigo Postal"})
.trim()
.min(1, {message: 'Codigo Postal is required'})
.max(20, {message: 'Codigo Postal must be less than 20 characters'});

export type RefugioCodigoPostalType = z.infer<typeof RefugioCodigoPostalSchema>;

export class RefugioCodigoPostal{
    constructor(
        private readonly value: RefugioCodigoPostalType,
    ){

        RefugioCodigoPostal.validate(value);
    }

    static  validate(value: string ): void {
       parseSchema(RefugioCodigoPostalSchema, value);
        
    }

    getValue(): RefugioCodigoPostalType {
        return this.value;
    }

    
}