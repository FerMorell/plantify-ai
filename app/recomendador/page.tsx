"use client";
import CatalogoPlantas from "@/components/CatalogoPlantas";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
export default function RecomendadorPage() {
    const { agregarAlCarrito } = useCarrito();
    const [luz, setLuz] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [mascotas, setMascotas] = useState("");
    const [tamano, setTamano] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [recomendacion, setRecomendacion] = useState("");
    const [cargando, setCargando] = useState(false);
    const [plantaRecomendada, setPlantaRecomendada] =
        useState<Planta | null>(null);
    async function obtenerRecomendacion() {

        // Comprobamos que haya respondido las preguntas principales
        if (!luz || !experiencia || !mascotas) {
            alert("Por favor, completa las preguntas principales.");
            return;
        }

        try {

            setCargando(true);
            setRecomendacion("");
            setPlantaRecomendada(null);
            const respuesta = await fetch("/api/recomendar", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    luz,
                    experiencia,
                    mascotas,
                    tamano,
                    descripcion,
                }),
            });


            const datos = await respuesta.json();


            if (!respuesta.ok) {
                throw new Error(
                    datos.error || "No se pudo obtener la recomendación"
                );
            }


            setRecomendacion(datos.recomendacion);
            setPlantaRecomendada(datos.planta);
        } catch (error) {

            console.error(error);

            setRecomendacion(
                "Ha ocurrido un error al buscar tu planta ideal. Inténtalo de nuevo."
            );

        } finally {

            setCargando(false);

        }
    }
    return (
        <main className="min-h-screen bg-stone-50">

            <Navbar />

            <div className="mx-auto max-w-3xl px-6 py-12">

                {/* CABECERA */}

                <div className="text-center">

                    <p className="font-medium text-green-700">
                        ✨ Plantify AI
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Encuentra tu planta perfecta
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-stone-600">
                        Cuéntanos cómo es tu hogar y tu estilo de vida.
                        Nuestro asistente inteligente te ayudará a encontrar
                        una planta adecuada para ti.
                    </p>

                </div>


                {/* FORMULARIO */}

                <Card className="mt-10">

                    <CardHeader>

                        <CardTitle>
                            Háblanos de tu hogar 🌿
                        </CardTitle>

                        <CardDescription>
                            Utilizaremos esta información para recomendarte
                            una planta de nuestro catálogo.
                        </CardDescription>

                    </CardHeader>


                    <CardContent className="space-y-7">

                        {/* LUZ */}

                        <div>

                            <label className="mb-2 block font-medium">
                                ☀️ ¿Cuánta luz recibe la habitación?
                            </label>

                            <select
                                value={luz}
                                onChange={(e) => setLuz(e.target.value)}
                                className="w-full rounded-lg border bg-white p-3"
                            >

                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="poca">
                                    Poca luz
                                </option>

                                <option value="media">
                                    Luz indirecta / media
                                </option>

                                <option value="mucha">
                                    Mucha luz
                                </option>

                            </select>

                        </div>


                        {/* EXPERIENCIA */}

                        <div>

                            <label className="mb-2 block font-medium">
                                🌱 ¿Qué experiencia tienes cuidando plantas?
                            </label>

                            <select
                                value={experiencia}
                                onChange={(e) => setExperiencia(e.target.value)}
                                className="w-full rounded-lg border bg-white p-3"
                            >

                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="principiante">
                                    Soy principiante
                                </option>

                                <option value="intermedia">
                                    Tengo algo de experiencia
                                </option>

                                <option value="experta">
                                    Tengo bastante experiencia
                                </option>

                            </select>

                        </div>


                        {/* MASCOTAS */}

                        <div>

                            <label className="mb-2 block font-medium">
                                🐾 ¿Tienes mascotas?
                            </label>

                            <select
                                value={mascotas}
                                onChange={(e) => setMascotas(e.target.value)}
                                className="w-full rounded-lg border bg-white p-3"
                            >

                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="si">
                                    Sí
                                </option>

                                <option value="no">
                                    No
                                </option>

                            </select>

                        </div>


                        {/* TAMAÑO */}

                        <div>

                            <label className="mb-2 block font-medium">
                                🪴 ¿Qué tamaño prefieres?
                            </label>

                            <select
                                value={tamano}
                                onChange={(e) => setTamano(e.target.value)}
                                className="w-full rounded-lg border bg-white p-3"
                            >

                                <option value="">
                                    Me da igual
                                </option>

                                <option value="pequena">
                                    Pequeña
                                </option>

                                <option value="mediana">
                                    Mediana
                                </option>

                                <option value="grande">
                                    Grande
                                </option>

                            </select>

                        </div>


                        {/* TEXTO LIBRE */}

                        <div>

                            <label className="mb-2 block font-medium">
                                💬 ¿Hay algo más que debamos saber?
                            </label>

                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Por ejemplo: viajo mucho y necesito una planta que no requiera demasiados cuidados..."
                                rows={4}
                                className="w-full resize-none rounded-lg border bg-white p-3"
                            />

                        </div>


                        {/* BOTÓN */}

                        <Button
                            size="lg"
                            className="w-full"
                            onClick={obtenerRecomendacion}
                            disabled={cargando}
                        >
                            {cargando
                                ? "🌱 Buscando tu planta ideal..."
                                : "✨ Recomendarme una planta"}
                        </Button>

                    </CardContent>

                </Card>
                {recomendacion && plantaRecomendada && (

                    <Card className="mt-8 overflow-hidden border-green-200">

                        <div className="grid md:grid-cols-2">

                            {/* FOTO */}
                            <div className="relative min-h-[350px]">

                                <Image
                                    src={plantaRecomendada.imagen}
                                    alt={plantaRecomendada.nombre}
                                    fill
                                    className="object-cover"
                                />

                            </div>


                            {/* INFORMACIÓN */}
                            <div className="flex flex-col justify-center p-8">

                                <p className="text-sm font-medium text-green-700">
                                    ✨ Plantify recomienda
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {plantaRecomendada.nombre}
                                </h2>

                                <p className="mt-4 leading-7 text-stone-600">
                                    {recomendacion}
                                </p>


                                <div className="mt-6 rounded-xl bg-green-50 p-4">

                                    <p>
                                        ☀️ <strong>Luz:</strong>{" "}
                                        {plantaRecomendada.luz}
                                    </p>

                                    <p className="mt-2">
                                        🌱 <strong>Dificultad:</strong>{" "}
                                        {plantaRecomendada.dificultad}
                                    </p>

                                    <p className="mt-2">
                                        🪴 <strong>Categoría:</strong>{" "}
                                        {plantaRecomendada.categoria}
                                    </p>

                                </div>


                                <p className="mt-6 text-3xl font-bold">
                                    {plantaRecomendada.precio
                                        .toFixed(2)
                                        .replace(".", ",")} €
                                </p>


                                <div className="mt-6 flex gap-3">

                                    <Button
                                        className="flex-1"
                                        onClick={() =>
                                            agregarAlCarrito(plantaRecomendada)
                                        }
                                    >
                                        🛒 Añadir al carrito
                                    </Button>

                                    <Link
                                        href={`/plantas/${plantaRecomendada.id}`}
                                    >
                                        <Button variant="outline">
                                            Ver detalles
                                        </Button>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </Card>

                )}
            </div>

        </main>
    );
}