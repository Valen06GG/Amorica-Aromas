'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginRequest } from "../services/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await loginRequest(username, password);

            localStorage.setItem("token", res.access_token);

            router.push("/admin");
        } catch (error) {
            alert('Credenciales incorrectas');
            
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl text-[#5a4634] mb-4">Login Admin</h2>
    
            <input
              placeholder="Usuario"
              className="border border-[#d6cfc4] text-[#5a4634] p-2 w-full mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
    
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-[#d6cfc4] text-[#5a4634] p-2 w-full mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <button
              onClick={handleLogin}
              className="bg-[#5a4634] text-white w-full py-2"
            >
              Ingresar
            </button>
          </div>
        </div>
    )
}