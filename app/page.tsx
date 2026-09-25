import { Button } from "@/components/ui/button";
import CatalogoPlantas from "@/components/CatalogoPlantas";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">

      {/* MENÚ */}
      <Navbar />

      {/* PRESENTACIÓN */}
      <section className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">

        <Badge variant="secondary" className="mb-5">
          🌿 Plantas seleccionadas para tu estilo de vida
        </Badge>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight">
          Encuentra la planta perfecta
          <span className="block text-green-700">
            para tu hogar.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-stone-600">
          Descubre plantas increíbles y deja que nuestro asistente
          con inteligencia artificial te ayude a encontrar la planta
          perfecta según tu hogar, estilo de vida y experiencia.
        </p>

        <div className="mt-8 flex gap-4">

          <Button size="lg">
            Ver plantas
          </Button>

          <Button size="lg" variant="outline">
            ✨ Encontrar mi planta
          </Button>

        </div>

      </section>


      {/* PLANTAS DESTACADAS */}
      <section
        id="plantas"
        className="bg-white px-8 py-16"
      >

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <p className="font-medium text-green-700">
              Nuestra colección
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Plantas destacadas
            </h2>

            <p className="mt-3 text-stone-600">
              Algunas de nuestras plantas favoritas para llenar
              de vida tu hogar.
            </p>

          </div>
          <CatalogoPlantas />

        </div>

      </section>


      {/* PIE DE PÁGINA */}
      <footer className="border-t bg-stone-50 px-8 py-8 text-center text-sm text-stone-500">

        🌱 Plantify AI — Encuentra la planta perfecta para tu hogar.

      </footer>

    </main>
  );
}