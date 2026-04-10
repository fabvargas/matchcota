import { Button } from "@/frontend/components/ui/button";
import RegisterRefugio from "./controller/auth/RegisterRefugio";
import RegisterAdoptante from "./controller/auth/RegisterAdoptante";
import LogIn from "./controller/auth/LogIn";


export default async function Home() {
  const name = "Fabian";
  const password = "123Ss@456";
  const email = "fabian@example.com";
  const confirmPassword = "123Ss@456";

  const action = await LogIn(email,password);

  console.log(action)
  return (
    <div >
      <Button variant="default" size="lg">
        Hello World
      </Button>
   
    </div>
  );
}
