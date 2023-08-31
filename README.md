# Podcasts App

Esta aplicación fue creada para escuchar podcasts musicales y fue desarrollada con React, TypeScript, TailwindCSS y Material-UI.

## Pre-requisitos

- Node.js
- npm

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

## Cómo usar

1. Inicia la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Pruebas

Esta aplicación cuenta con pruebas unitarias. Para ejecutar las pruebas:

   ```bash
    npm test
   ```

Este comando lanzará el test runner en modo interactivo. Podrás ver los resultados y el progreso de las pruebas en la consola.

Características
Buscador de Podcasts: Permite al usuario buscar podcasts.
Detalle de Podcast: El usuario puede ver detalles de un podcast específico.
API y servicios
Se utiliza la iTunes Search API para obtener información de podcasts. Debido a restricciones CORS, se hace uso de un proxy 'https://corsproxy.io' para obtener datos.

Herramientas y tecnologías
React
TypeScript
TailwindCSS
Material-UI
iTunes Search API
