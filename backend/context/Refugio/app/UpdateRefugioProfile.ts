


type RefugioProfile = {
    name: string;
    address?: string;
    telephone?: string;
    description?: string;
    comuna?: string;
    codigoPostal?: string;
}


export class UpdateRefugioProfileUseCase {

    constructor(
       
    ){}

    async execute(
        name: string,
        address?: string,
        telephone?: string,
        description?: string,
        comuna?: string,
        codigoPostal?: string
    ): Promise<RefugioProfile> {

        const data = {
            name,
            address,
            telephone,
            description,
            comuna,
            codigoPostal
        };

        
       return data;

    }

}