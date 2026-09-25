"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";

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

type ProductoCarrito = Planta & {
    cantidad: number;
};

type CarritoContextType = {
    carrito: ProductoCarrito[];
    agregarAlCarrito: (planta: Planta) => void;
    aumentarCantidad: (id: number) => void;
    disminuirCantidad: (id: number) => void;
    eliminarDelCarrito: (id: number) => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(
    undefined
);

export function CarritoProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
    const [carritoCargado, setCarritoCargado] = useState(false);
    useEffect(() => {

        const carritoGuardado = localStorage.getItem("plantify-carrito");

        if (carritoGuardado) {
            try {
                setCarrito(JSON.parse(carritoGuardado));
            } catch {
                console.error("No se pudo recuperar el carrito.");
            }
        }

        setCarritoCargado(true);

    }, []);
    useEffect(() => {

        if (carritoCargado) {
            localStorage.setItem(
                "plantify-carrito",
                JSON.stringify(carrito)
            );
        }

    }, [carrito, carritoCargado]);
    function agregarAlCarrito(planta: Planta) {

        setCarrito((carritoActual) => {

            const productoExiste = carritoActual.find(
                (producto) => producto.id === planta.id
            );

            // Si ya existe, aumentamos la cantidad
            if (productoExiste) {

                return carritoActual.map((producto) =>
                    producto.id === planta.id
                        ? {
                            ...producto,
                            cantidad: producto.cantidad + 1,
                        }
                        : producto
                );
            }

            // Si no existe, lo añadimos
            return [
                ...carritoActual,
                {
                    ...planta,
                    cantidad: 1,
                },
            ];
        });
    }
    function aumentarCantidad(id: number) {

        setCarrito((carritoActual) =>
            carritoActual.map((producto) =>
                producto.id === id
                    ? {
                        ...producto,
                        cantidad: producto.cantidad + 1,
                    }
                    : producto
            )
        );
    }


    function disminuirCantidad(id: number) {

        setCarrito((carritoActual) =>
            carritoActual
                .map((producto) =>
                    producto.id === id
                        ? {
                            ...producto,
                            cantidad: producto.cantidad - 1,
                        }
                        : producto
                )
                .filter((producto) => producto.cantidad > 0)
        );
    }


    function eliminarDelCarrito(id: number) {

        setCarrito((carritoActual) =>
            carritoActual.filter(
                (producto) => producto.id !== id
            )
        );
    }
    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                aumentarCantidad,
                disminuirCantidad,
                eliminarDelCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {

    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error(
            "useCarrito debe utilizarse dentro de CarritoProvider"
        );
    }

    return context;
}