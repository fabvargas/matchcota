export class Pet {

    constructor(
        private readonly id: string,
        private readonly id_refugio: string,
        private readonly id_tipo: string,
        private readonly id_raza: string,
        private readonly id_estado: string,
        private readonly id_comuna : string,
        private readonly name?: string,
        private readonly age?: number,
        private readonly genre?: string,
        private readonly size?: string,
        private readonly description?: string,
        private readonly imageUrl?: string,
        private readonly createdAt?: Date,
        private readonly updatedAt?: Date,
    ){}



}