import {z} from 'zod';
import { parseSchema } from '@/backend/utils/parseSchema';
import { ComunaSchema, ComunaType } from '@/backend/context/Shared/ComunaType';

const RefugioComunaSchema = ComunaSchema;

export type RefugioComunaType = z.infer<typeof RefugioComunaSchema>;

export class RefugioComuna{
    constructor(
        public readonly value: RefugioComunaType,
    ){

        RefugioComuna.validate(value);
    }

    static validate(value: RefugioComunaType): void {
            parseSchema(RefugioComunaSchema, value);
        
    }

    getValue(): RefugioComunaType {
        return this.value;
    }

    getComunas(): string[] {
        return ComunaSchema.options;
    }

    isComuna(value: string): boolean {
        return ComunaSchema.options.includes(value as any);
    }

}