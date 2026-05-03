import {z} from 'zod';
import { parseSchema } from '@/backend/utils/parseSchema';

export const RefugioAddressSchema = z
.string({message: "Invalid address"})
.trim()
.min(0, {message: 'Address is required'})
.max(200, {message: 'Address must be less than 200 characters'});

export type RefugioAddressType = z.infer<typeof RefugioAddressSchema>;

export class RefugioAddress{
    constructor(
        private readonly value: RefugioAddressType,
    ){

        RefugioAddress.validate(value);
    }

    static  validate(value: string ): void {
       parseSchema(RefugioAddressSchema, value);  
    }


    getValue(): RefugioAddressType {
        return this.value;
    }

    
}