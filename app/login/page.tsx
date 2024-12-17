"use client";

import { useState, FormEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      toast.error("Error en el inicio de sesión");
    } else {
      router.push("/dashboard/ventas");
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const { data: session, status } = useSession(); // Obtén la sesión y el estado de la sesión
  useEffect(() => {
    if (session) {
      // Si ya hay una sesión activa, redirigimos al home
      router.push("/dashboard/productos"); // Redirige al home
    }
  }, [session, router]); // Se ejecuta cuando la sesión cambia

  if (status === "loading") {
    // Mientras se carga la sesión, puedes mostrar un loading spinner o mensaje
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <Card className="rounded-sm w-[380px]">
        <div className="flex justify-center items-center my-6">
          <Image
            src="/FIXLABS_logoblanco_2024.svg"
            alt="Logo de FIXLABS"
            width={200}
            height={50}
            priority
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  placeholder="Email"
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 py-2 pr-9"
                />
                <Mail
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <Input
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 py-2 pr-9"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full rounded-sm bg-blue-950">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}