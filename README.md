# Gacha Simulator (FGO)
# ✨ FGO Gacha Simulator ✨

<p align="center">
  <img src="apps/frontend/public/GUDAKO.png" alt="Gudako" width="150"/>
</p> 

Un simulador web que recrea la experiencia de "rollear" en el juego de celular Fate/Grand Order, permitiendo a los usuarios probar su suerte en diferentes banners con tasas de aparición precisas.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p> 

## 🚀 Capturas de Pantalla

![Captura de Pantalla 1: Selección de Banner](apps/frontend/public/images/screenshot1.png)
El usuario seleccionando un banner de invocación.

![Captura de Pantalla 2: Resultados de Invocación](apps/frontend/public/images/screenshot2.png)
Visualización de los Servants y CEs obtenidos en una tirada múltiple.

![Captura de Pantalla 3: Estadísticas del Usuario](apps/frontend/public/images/screenshot3.png)
Sección de estadísticas mostrando SQ gastado y rarezas obtenidas.


## 🌟 Características Principales

*   **Selección de Banner:** Elige entre diferentes banners con Servants y CEs destacados y sus tasas específicas.
*   **Simulación de Tiradas:** Realiza tiradas individuales (Single Roll) y múltiples (Multi-Roll).
*   **Tasas de Aparición Precisas:** Lógica en el backend que simula las probabilidades correctas de FGO (simplificadas).
*   **Visualización de Resultados:** Muestra las cartas obtenidas con sus imágenes, rareza y nombre.
*   **Estadísticas de Usuario:** Lleva un registro del "Saint Quartz" gastado y un resumen de lo obtenido.
*   **Objetivos de Invocación:** Simula tiradas automáticamente hasta obtener un Servant o CE específico.
*   **Interfaz Amigable:** Diseño responsivo y atractivo utilizando Tailwind CSS con un tema oscuro.

## 🛠️ Tecnologías Utilizadas

*   **Frontend:**
    *   [React.js](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:**
    *   [Nest.JS](https://nestjs.com/) 
*   **Estructura:**
    *   Monorepo 

## ⚙️ Configuración y Ejecución Local

### Prerrequisitos

*   [Node.js](https://nodejs.org/) (v18.x o superior recomendado)
*   [npm](https://www.npmjs.com/) 
*   Git

### Pasos para la Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/bryanHcarvajal/gacha-simulator.git
    cd gacha-simulator
    ```

2.  **Instala las dependencias del Backend:**
    ```bash
    cd apps/backend
    npm install 
    ```

3.  **Instala las dependencias del Frontend:**
    ```bash
    cd ../frontend 
    # (Si estabas en apps/backend, sino cd apps/frontend desde la raíz)
    npm install
    ```

### Ejecución

1.  **Inicia el Servidor Backend:**
    Desde la carpeta `apps/backend`:
    ```bash
    npm run start:dev
    ```
    El backend estará disponible en `http://localhost:3000` (o el puerto que tengas configurado).

2.  **Inicia la Aplicación Frontend:**
    Desde la carpeta `apps/frontend` (en una nueva terminal):
    ```bash
    npm run dev
    ```
    La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

Abre tu navegador y ve a la URL del frontend para usar el simulador.




