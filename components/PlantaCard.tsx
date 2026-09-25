"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCarrito } from "@/context/CarritoContext";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Planta = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    dificultad: string;
    luz: string;
    imagen: string;
};

type PlantaCardProps = {
    planta: Planta;
};

export default function PlantaCard({ planta }: PlantaCardProps) {
    const { agregarAlCarrito } = useCarrito();
    return (
        <Card className="overflow-hidden">

            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={planta.imagen}
                    alt={planta.nombre}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <CardHeader>

                <div className="flex flex-wrap gap-2">

                    <Badge>
                        {planta.categoria}
                    </Badge>

                    <Badge variant="secondary">
                        {planta.dificultad}
                    </Badge>

                </div>

                <CardTitle className="mt-2">
                    {planta.nombre}
                </CardTitle>

                <CardDescription>
                    {planta.descripcion}
                </CardDescription>

            </CardHeader>

            <CardContent>

                <p className="mb-2 text-sm text-stone-500">
                    ☀️ {planta.luz}
                </p>

                <p className="text-2xl font-bold">
                    {planta.precio.toFixed(2).replace(".", ",")} €
                </p>

            </CardContent>

            <CardFooter className="gap-2">

                <Button
                    className="flex-1"
                    onClick={() => agregarAlCarrito(planta)}
                >
                    🛒 Añadir
                </Button>

                <Link href={`/plantas/${planta.id}`}>
                    <Button variant="outline">
                        Ver detalles
                    </Button>
                </Link>

            </CardFooter>

        </Card>
    );
}