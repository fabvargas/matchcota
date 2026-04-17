import  {z} from "zod";
import   {parseSchema} from "@/backend/utils/parseSchema";


const RefugioImgUrlSchema = z.url().optional();

type RefugioImgUrlType = z.infer<typeof RefugioImgUrlSchema>;

export class RefugioImgUrl{
     constructor(
        private readonly value: RefugioImgUrlType
    ){
        RefugioImgUrl.validate(value);
    }

   static validate(value: RefugioImgUrlType): void {
     parseSchema(RefugioImgUrlSchema, value);
    }

    getValue(): RefugioImgUrlType {
        return this.value;
    }
}