"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/context/CarritoContext";

export default function Navbar() {

    const { carrito } = useCarrito();

    const cantidadProductos = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    return (
        <nav className="flex items-center justify-between border-b bg-white px-8 py-5">

            {/* LOGO */}
            <Link
                href="/"
                className="text-2xl font-bold"
            >
                🌱 Plantify AI
            </Link>


            {/* MENÚ */}
            <div className="flex items-center gap-6">

                <Link
                    href="/"
                    className="hover:text-green-700"
                >
                    Inicio
                </Link>

                <Link
                    href="/#plantas"
                    className="hover:text-green-700"
                >
                    Plantas
                </Link>

                <Link
                    href="/recomendador"
                    className="hover:text-green-700"
                >
                    ✨ Encuentra tu planta
                </Link>


                {/* CARRITO */}
                <Link href="/carrito">

                    <Button variant="outline">
                        🛒 Carrito ({cantidadProductos})
                    </Button>

                </Link>

            </div>

        </nav>
    );
}