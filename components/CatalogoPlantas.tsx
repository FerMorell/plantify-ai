"use client";

import { useState } from "react";

import { plantas } from "@/data/plantas";
import PlantaCard from "@/components/PlantaCard";
import { Input } from "@/components/ui/input";

export default function CatalogoPlantas() {
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todas");
    const [dificultad, setDificultad] = useState("Todas");

    const plantasFiltradas = plantas.filter((planta) => {
        const coincideBusqueda =
            planta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            planta.descripcion.toLowerCase().includes(busqueda.toLowerCase());

        const coincideCategoria =
            categoria === "Todas" ||
            planta.categoria === categoria;

        const coincideDificultad =
            dificultad === "Todas" ||
            planta.dificultad === dificultad;

        return (
            coincideBusqueda &&
            coincideCategoria &&
            coincideDificultad
        );
    });

    return (
        <>
            {/* BUSCADOR Y FILTROS */}
            <div className="mb-10 rounded-2xl border bg-stone-50 p-5">

                <Input
                    type="text"
                    placeholder="🔎 Buscar una planta..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                    {/* CATEGORÍA */}
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="rounded-lg border bg-white p-3"
                    >
                        <option value="Todas">
                            Todas las categorías
                        </option>

                        <option value="Interior">
                            Interior
                        </option>

                        <option value="Cactus">
                            Cactus
                        </option>

                        <option value="Suculentas">
                            Suculentas
                        </option>
                    </select>

                    {/* DIFICULTAD */}
                    <select
                        value={dificultad}
                        onChange={(e) => setDificultad(e.target.value)}
                        className="rounded-lg border bg-white p-3"
                    >
                        <option value="Todas">
                            Todas las dificultades
                        </option>

                        <option value="Muy fácil">
                            Muy fácil
                        </option>

                        <option value="Fácil">
                            Fácil
                        </option>

                        <option value="Media">
                            Media
                        </option>
                    </select>

                </div>

            </div>

            {/* RESULTADOS */}
            <p className="mb-5 text-sm text-stone-500">
                {plantasFiltradas.length} plantas encontradas
            </p>

            {plantasFiltradas.length > 0 ? (

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {plantasFiltradas.map((planta) => (
                        <PlantaCard
                            key={planta.id}
                            planta={planta}
                        />
                    ))}

                </div>

            ) : (

                <div className="rounded-2xl border bg-stone-50 p-12 text-center">

                    <p className="text-5xl">
                        🌱
                    </p>

                    <h3 className="mt-4 text-xl font-bold">
                        No encontramos plantas
                    </h3>

                    <p className="mt-2 text-stone-500">
                        Prueba con otra búsqueda o cambia los filtros.
                    </p>

                </div>

            )}
        </>
    );
}