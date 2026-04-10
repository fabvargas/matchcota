export class ValidateDomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidateDomainError";
    }
}