


export class AuthPasswordHashed {

    private constructor(
        private readonly value:string
    ){}

    static create(value:string): AuthPasswordHashed {
        return new AuthPasswordHashed(value);
    }
    getValue(): string {
        return this.value;
    }

  
}