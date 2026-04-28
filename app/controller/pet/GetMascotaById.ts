
import { GetPetByIdUseCase } from "@/backend/context/Pet/app/GetPetByIdUseCase";
import { SupabasePetRepository } from "@/backend/context/Pet/infra/SupabasePetRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";



export async function GetMascotaById(id: string) {

 const dbClient = SupabaseService.getInstance().getClient();

 const petRepository = new SupabasePetRepository(dbClient);
 const refugioRepository = new SupabaseRefugioRepository(dbClient);

 const useCase = new GetPetByIdUseCase(petRepository, refugioRepository);
  
 const pet = await useCase.execute(id);


 return pet || null;
    
}