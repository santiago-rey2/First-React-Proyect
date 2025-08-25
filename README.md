# First React Project

Este es mi primer proyecto con React usando Vite como bundler. El proyecto incluye una aplicación de carta de restaurante desarrollada con TypeScript y React.

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (incluido con Node.js) o yarn

## 📦 Creación del Proyecto

### 1. Crear un nuevo proyecto React con Vite

```bash
# Crear el proyecto usando Vite
npm create vite@latest carta-restaurante -- --template react-ts

# Navegar al directorio del proyecto
cd carta-restaurante

# Instalar las dependencias
npm install
```

### 2. Comandos disponibles

```bash
# Ejecutar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la construcción de producción
npm run preview

# Ejecutar el linter
npm run lint
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript** - Superset de JavaScript que añade tipado estático
- **Vite** - Herramienta de construcción rápida para desarrollo frontend
- **ESLint** - Herramienta de análisis de código para identificar patrones problemáticos

## 📁 Estructura del Proyecto

```text
carta-restaurante/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

## 🐳 Docker

El proyecto incluye configuración de Docker para facilitar el despliegue:

```bash
# Construir la imagen Docker
docker build -t carta-restaurante .

# Ejecutar el contenedor
docker run -p 80:80 carta-restaurante
```

## 🚀 Comenzar el Desarrollo

- Clona este repositorio:

```bash
git clone https://github.com/santiago-rey2/First-React-Proyect.git
cd First-React-Proyect/carta-restaurante
```

- Instala las dependencias:

```bash
npm install
```

- Inicia el servidor de desarrollo:

```bash
npm run dev
```

- Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 📝 Notas Adicionales

- El proyecto está configurado con TypeScript para mejor tipado y desarrollo
- Se incluye ESLint para mantener la calidad del código
- Vite proporciona hot module replacement para un desarrollo más rápido
- La configuración de Docker permite un despliegue fácil en cualquier entorno