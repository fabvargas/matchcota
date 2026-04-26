import { PetImageUrl } from "./PetImageUrl";

export class PetImages {

  constructor(
    private readonly images: PetImageUrl[], // 👈 ya no hero obligatoria
  ){}

  static create(images: PetImageUrl[]): PetImages {
    return new PetImages(images);
  }

  getAllImages(): PetImageUrl[] {
    return this.images;
  }

  getHeroImage(): PetImageUrl | undefined {
    return this.images[0]; // 👈 puede no existir
  }

  hasImages(): boolean {
    return this.images.length > 0;
  }
}