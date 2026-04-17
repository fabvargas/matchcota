import { PetImageUrl } from "./PetImageUrl";


export class PetImages {

    constructor(
        private readonly heroImage: PetImageUrl,
        private readonly images?: PetImageUrl[], 
    ){}

    static create( heroImage: PetImageUrl, images?: PetImageUrl[]): PetImages {
        return new PetImages(heroImage, images);
    }

    getHeroImage(): PetImageUrl {
        return this.heroImage;
    }

    getImages(): PetImageUrl[] | undefined {
        return this.images;
    }



}