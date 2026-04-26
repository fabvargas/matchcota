import { PetId } from "../domain/PetId";
import { PetRepository } from "../domain/PetRepository";


export class UpdatePetUseCase {
  private petRepository: PetRepository;

  constructor(petRepository: PetRepository) {
    this.petRepository = petRepository;
  }

  async execute(data: any, userId: string): Promise<void> {
    const pet = await this.petRepository.findById(new PetId(data.id));
    if (!pet) {
      throw new Error("Mascota no encontrada");
    }
 



    const petToUpdate = pet.update({
    name: data.name,
    raza: data.breed,
    age: data.age,
    tipo: data.type,
    genre: data.genre,
    comuna: data.comuna,
    personality: data.personality,
    energy_level: parseInt(data.energy_level, 10),
    size: data.size,
    health_description: data.health_description,
    description: data.description,
    images: data.images,
        });
    

    await this.petRepository.update(petToUpdate);
  } 
}
