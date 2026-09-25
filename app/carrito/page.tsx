"use client";

import Link from "next/link";
import Image from "next/image";

import { useCarrito } from "@/context/CarritoContext";
import { Button } from "@/components/ui/button";

export default function CarritoPage() {

    const {
        carrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
    } = useCarrito();

    // Calculamos el precio total
    const total = carrito.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );

    return (
        <main className="min-h-screen bg-stone-50">

            <div className="mx-auto max-w-5xl px-6 py-12">

                {/* VOLVER */}
                <Link
                    href="/"
                    className="text-sm text-stone-600 hover:text-green-700"
                >
                    ← Seguir comprando
                </Link>

                <h1 className="mt-6 text-4xl font-bold">
                    🛒 Tu carrito
                </h1>

                <p className="mt-2 text-stone-600">
                    Revisa las plantas que has seleccionado.
                </p>


                {/* CARRITO VACÍO */}
                {carrito.length === 0 ? (

                    <div className="mt-12 rounded-2xl border bg-white p-12 text-center">

                        <div className="text-6xl">
                            🌱
                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            Tu carrito está vacío
                        </h2>

                        <p className="mt-2 text-stone-600">
                            Parece que todavía no has añadido ninguna planta.
                        </p>

                        <Link href="/">

                            <Button className="mt-6">
                                Ver plantas
                            </Button>

                        </Link>

                    </div>

                ) : (

                    /* CARRITO CON PRODUCTOS */
                    <div className="mt-10 grid gap-8 lg:grid-cols-3">

                        {/* PRODUCTOS */}
                        <div className="space-y-4 lg:col-span-2">

                            {carrito.map((producto) => (

                                <div
                                    key={producto.id}
                                    className="flex gap-5 rounded-2xl border bg-white p-4"
                                >

                                    {/* IMAGEN */}
                                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">

                                        <Image
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            fill
                                            className="object-cover"
                                        />

                                    </div>


                                    {/* INFORMACIÓN */}
                                    <div className="flex flex-1 flex-col justify-center">

                                        <h2 className="text-lg font-bold">
                                            {producto.nombre}
                                        </h2>

                                        <p className="mt-1 text-sm text-stone-500">
                                            {producto.categoria}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2">

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => disminuirCantidad(producto.id)}
                                            >
                                                −
                                            </Button>

                                            <span className="min-w-8 text-center font-medium">
                                                {producto.cantidad}
                                            </span>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => aumentarCantidad(producto.id)}
                                            >
                                                +
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => eliminarDelCarrito(producto.id)}
                                                className="ml-2 text-red-600"
                                            >
                                                Eliminar
                                            </Button>

                                        </div>

                                    </div>


                                    {/* PRECIO */}
                                    <div className="flex items-center">

                                        <p className="font-bold">
                                            {(
                                                producto.precio *
                                                producto.cantidad
                                            )
                                                .toFixed(2)
                                                .replace(".", ",")} €
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* RESUMEN */}
                        <div>

                            <div className="rounded-2xl border bg-white p-6">

                                <h2 className="text-xl font-bold">
                                    Resumen del pedido
                                </h2>

                                <div className="mt-6 flex justify-between text-stone-600">

                                    <span>
                                        Productos
                                    </span>

                                    <span>
                                        {carrito.reduce(
                                            (cantidad, producto) =>
                                                cantidad + producto.cantidad,
                                            0
                                        )}
                                    </span>

                                </div>

                                <div className="my-6 border-t" />

                                <div className="flex items-center justify-between">

                                    <span className="text-lg font-bold">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-green-700">
                                        {total.toFixed(2).replace(".", ",")} €
                                    </span>

                                </div>

                                <Button
                                    size="lg"
                                    className="mt-6 w-full"
                                >
                                    Finalizar compra
                                </Button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </main>
    );
}