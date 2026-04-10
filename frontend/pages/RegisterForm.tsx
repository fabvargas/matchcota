"use client";

import LogIn from "@/app/controller/auth/LogIn";
import { useState } from "react";


export default function RegisterForm() {
    const [message, setMessage] = useState("");


async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await LogIn(email, password);

  if (response.error) {
    setMessage(response.message);
  } else {
    setMessage("Inicio de sesión exitoso");
  }
}


  return (
    <form action={loginAction} className="flex flex-col gap-4 max-w-sm">
        
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="border p-2 rounded"
          />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border p-2 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-black text-white p-2 rounded"
      >
        Iniciar sesión
      </button>

        {message && <p>{message}</p>}
    </form>
  );
}