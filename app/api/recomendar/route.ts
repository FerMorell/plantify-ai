import { plantas } from "@/data/plantas";

export async function POST(request: Request) {
    try {
        const {
            luz,
            experiencia,
            mascotas,
            tamano,
            descripcion,
        } = await request.json();

        // Simulamos el tiempo que tardaría la IA en responder
        await new Promise((resolve) => setTimeout(resolve, 1200));

        let plantaRecomendada;

        /*
         * RECOMENDADOR LOCAL
         *
         * Más adelante esta lógica puede sustituirse por AI SDK
         * sin cambiar el frontend.
         */

        if (mascotas === "si") {
            // Calathea es una opción habitual para hogares con mascotas
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Calathea"
            );
        } else if (luz === "poca") {
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Sansevieria"
            );
        } else if (
            luz === "mucha" &&
            experiencia === "principiante"
        ) {
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Aloe Vera"
            );
        } else if (luz === "mucha") {
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Cactus del Desierto"
            );
        } else if (experiencia === "principiante") {
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Pothos Dorado"
            );
        } else {
            plantaRecomendada = plantas.find(
                (planta) => planta.nombre === "Monstera Deliciosa"
            );
        }

        if (!plantaRecomendada) {
            return Response.json(
                {
                    error: "No se encontró una planta adecuada.",
                },
                {
                    status: 404,
                }
            );
        }

        let motivo =
            `Según las características de tu hogar, ` +
            `te recomendamos ${plantaRecomendada.nombre}. `;

        if (mascotas === "si") {
            motivo +=
                "Hemos tenido especialmente en cuenta que tienes mascotas. ";
        }

        if (luz === "poca") {
            motivo +=
                "También hemos considerado que dispones de poca luz. ";
        }

        if (experiencia === "principiante") {
            motivo +=
                "Además, buscamos una opción adecuada para alguien que está empezando. ";
        }

        if (tamano) {
            motivo += `Has indicado una preferencia de tamaño ${tamano}. `;
        }

        if (descripcion) {
            motivo +=
                "También hemos tenido en cuenta la información adicional que nos has proporcionado.";
        }

        return Response.json({
            planta: plantaRecomendada,
            recomendacion: motivo,
            modo: "local",
        });

    } catch (error) {
        console.error("Error en el recomendador:", error);

        return Response.json(
            {
                error: "No se pudo generar la recomendación.",
            },
            {
                status: 500,
            }
        );
    }
}