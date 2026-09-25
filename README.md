# 🌱 Plantify AI

Plantify AI es una aplicación web de comercio electrónico de plantas desarrollada como proyecto demostrativo utilizando **React, Next.js, TypeScript, Tailwind CSS y shadcn/ui**.

El objetivo del proyecto es ofrecer una experiencia sencilla para descubrir plantas, consultar sus características, añadir productos al carrito y obtener una recomendación personalizada según las condiciones del hogar y el estilo de vida del usuario.

## ✨ Funcionalidades

- 🌿 Catálogo dinámico de plantas
- 🔎 Buscador de productos
- 🏷️ Filtros por categoría y dificultad
- 📄 Página de detalle para cada planta
- 🛒 Carrito de compra
- ➕ Aumentar y disminuir cantidades
- 🗑️ Eliminar productos del carrito
- 💾 Persistencia del carrito mediante LocalStorage
- 📱 Diseño responsive
- ✨ Recomendador personalizado de plantas
- 🔌 API interna mediante Next.js Route Handlers

## 🤖 Recomendador Plantify

Plantify incluye un sistema que recomienda una planta según información proporcionada por el usuario, como:

- Cantidad de luz disponible
- Experiencia cuidando plantas
- Presencia de mascotas
- Tamaño de planta preferido
- Información adicional sobre su estilo de vida

El frontend envía esta información mediante una petición `POST` al endpoint:

```text
/api/recomendar
```

La arquitectura del proyecto está preparada para utilizar **Vercel AI SDK** con un proveedor de modelos de IA.

Para que la demo pueda funcionar sin depender de créditos o disponibilidad de un proveedor externo, actualmente dispone de un **modo de recomendación local basado en reglas**.

De esta forma, la interfaz y la API permanecen desacopladas y el recomendador puede sustituirse por un modelo de IA sin modificar el flujo principal del frontend.

## 🛠️ Tecnologías

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel AI SDK
- Next.js App Router
- React Context API
- LocalStorage

## 🏗️ Arquitectura

```text
Usuario
   │
   ▼
React / Next.js
   │
   ├── Catálogo
   ├── Buscador y filtros
   ├── Detalle de productos
   ├── Carrito
   │
   └── Recomendador
            │
            ▼
      POST /api/recomendar
            │
            ▼
      Next.js Route Handler
            │
            ├── Recomendador local
            │
            └── AI SDK (integración preparada)
```

## 🛒 Gestión del carrito

El carrito utiliza **React Context API** para compartir su estado entre diferentes componentes y páginas.

Los productos seleccionados se almacenan también en **LocalStorage**, permitiendo conservar el carrito incluso después de recargar la página.

## 📂 Estructura principal

```text
app/
├── api/
│   └── recomendar/
├── carrito/
├── plantas/
│   └── [id]/
├── recomendador/
├── layout.tsx
└── page.tsx

components/
├── ui/
├── CatalogoPlantas.tsx
├── Navbar.tsx
└── PlantaCard.tsx

context/
└── CarritoContext.tsx

data/
└── plantas.ts

public/
└── plantas/
```

## 🚀 Ejecutar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/FerMorell/plantify-ai.git
```

Entrar en el proyecto:

```bash
cd plantify-ai
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## 🔐 Variables de entorno

Las credenciales privadas nunca deben almacenarse directamente en el código ni subirse al repositorio.

Para utilizar un proveedor de IA se puede crear:

```text
.env.local
```

Por ejemplo:

```env
OPENAI_API_KEY=tu_api_key
```

`.env.local` está excluido del repositorio mediante `.gitignore`.

## 🌐 Despliegue

El proyecto está preparado para desplegarse mediante **Vercel**.

La demo pública se añadirá aquí una vez realizado el despliegue.

## 👩‍💻 Autora

**Fernanda Morelli**

GitHub: https://github.com/FerMorell

---

Proyecto desarrollado como demostración práctica de desarrollo frontend/full-stack con React, Next.js y herramientas modernas del ecosistema web.