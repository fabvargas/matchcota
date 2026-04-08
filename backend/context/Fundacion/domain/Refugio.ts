
export class Refugio{

    constructor(
        private readonly id:string,
        private readonly name:string,
        private readonly telephone:string,
        private readonly description:string | null,
        private readonly address:string,
        private readonly comuna:string,
        private readonly codigoPostal:string,
    ){
        
    }
}