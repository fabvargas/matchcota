import {IntegerId,IntegerIdType} from "../Shared/IntegerId";


export type RolIdType = IntegerIdType;

export class RolId  extends IntegerId {
   constructor(value: RolIdType) {
    super(value);
   } 
}