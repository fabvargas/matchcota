import Profile from "@/frontend/components/profile";
import GetProfile from "../controller/profile/GetProfile";
import { UserProfileType } from "@/frontend/type";

export default async function Perfil() {
  const profileData = await GetProfile();

  if (!profileData.data) {
  return <div>No hay perfil</div>;
} 



  const userProfile: UserProfileType = {
    name: profileData.data?.name ,
    email: profileData.data?.email, 
    role: profileData.data?.role,
    telephone: profileData.data?.telephone ,
    region: profileData.data?.region ,
    comuna: profileData.data?.comuna,
    address: profileData.data?.address ,
    description: profileData.data?.description,
  }


  return (
  
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Profile profile={userProfile}/>
      </div>
  
  );
}
