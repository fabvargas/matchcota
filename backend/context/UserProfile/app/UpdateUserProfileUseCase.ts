


type UserProfile = {
    name: string;
    address?: string;
    telephone?: string;
    description?: string;
    comuna?: string;
    codigoPostal?: string;
}


export class UpdateUserProfileUseCase {

    constructor(
       
    ){}

    async execute(
        name: string,
        address?: string,
        telephone?: string,
        comuna?: string,
    ): Promise<UserProfile> {

        const data = {
            name,
            address,
            telephone,
            comuna,
        };

        
       return data;

    }

}