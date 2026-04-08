

export class UserProfile{

    constructor(
        private readonly id:string,
        private readonly name:string,
        private readonly telephone:string | null,
        private readonly address:string | null,
        private readonly comuna:string | null,
    ){}
}