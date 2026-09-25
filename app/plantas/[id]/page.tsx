import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { plantas } from "@/data/plantas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function DetallePlanta({ params }: Props) {

    const { id } = await params;

    const planta = plantas.find(
        (planta) => planta.id === Number(id)
    );

    if (!planta) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-stone-50">

            <div className="mx-auto max-w-6xl px-6 py-12">

                {/* VOLVER */}
                <Link
                    href="/"
                    className="mb-8 inline-block text-sm text-stone-600 hover:text-green-700"
                >
                    ← Volver a las plantas
                </Link>


                <div className="grid gap-12 md:grid-cols-2">

                    {/* IMAGEN */}
                    <div className="relative min-h-[500px] overflow-hidden rounded-2xl">

                        <Image
                            src={planta.imagen}
                            alt={planta.nombre}
                            fill
                            className="object-cover"
                        />

                    </div>


                    {/* INFORMACIÓN */}
                    <div className="flex flex-col justify-center">

                        <div className="mb-4 flex flex-wrap gap-2">

                            <Badge>
                                {planta.categoria}
                            </Badge>

                            <Badge variant="secondary">
                                {planta.dificultad}
                            </Badge>

                        </div>


                        <h1 className="text-4xl font-bold">
                            {planta.nombre}
                        </h1>


                        <p className="mt-5 text-lg leading-8 text-stone-600">
                            {planta.descripcion}
                        </p>


                        <div className="mt-8 rounded-xl bg-white p-6">

                            <p className="text-sm text-stone-500">
                                Necesidades de luz
                            </p>

                            <p className="mt-1 font-medium">
                                ☀️ {planta.luz}
                            </p>

                        </div>


                        <p className="mt-8 text-3xl font-bold">
                            {planta.precio.toFixed(2).replace(".", ",")} €
                        </p>


                        <Button
                            size="lg"
                            className="mt-6"
                        >
                            🛒 Añadir al carrito
                        </Button>

                    </div>

                </div>

            </div>

        </main>
    );
}