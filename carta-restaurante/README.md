# Carta Restaurante - React + TypeScript + Vite

Este proyecto es una carta digital para restaurante, desarrollada con **React**, **TypeScript** y **Vite**. Incluye gestión de menús, alérgenos, navegación responsive y estilos personalizados.

## Características principales

- **Frontend:** React + TypeScript + Vite
- **Estilos:** CSS modularizado y responsive
- **Datos:** Consumo de API REST para platos y alérgenos
- **Internacionalización:** Soporte multilenguaje con i18next
- **Componentes clave:** Menú, subsecciones, alérgenos, footer, dropdowns, etc.
- **Responsive:** Adaptado para móvil y escritorio
- **Validación:** Uso de Zod para validar los datos recibidos de la API

---

## Estructura del proyecto

```
carta-restaurante/
├── src/
│   ├── components/
│   │   ├── Menu/
│   │   │   ├── MenuSection.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   └── AllergenGuide.tsx
│   │   ├── Layout/
│   │   │   └── Footer.tsx
│   │   └── DropdownMenu/
│   │       └── DropdownMenu.tsx
│   ├── models/
│   │   └── platosDTO.ts
│   ├── Pages/
│   │   └── MenuPage.tsx
│   ├── utils/
│   │   └── Translations.ts
│   ├── index.css
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

---

## Despliegue rápido

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/First-React-Proyect.git
cd First-React-Proyect/carta-restaurante
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la API

Asegúrate de que el backend de la API REST esté disponible en la URL configurada (por defecto: `http://127.0.0.1:8000/api/v1/public/platos`).  
Puedes modificar la URL en `src/models/platosDTO.ts` si es necesario.

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite).

---

## Notas adicionales

- **Personalización de estilos:** Modifica `src/index.css` para adaptar los colores, fuentes y responsive según tu imagen de marca.
- **Gestión de menús:** Los datos de platos y alérgenos se obtienen y validan automáticamente desde la API.
- **Internacionalización:** Puedes añadir o modificar traducciones en `src/utils/Translations.ts`.
- **Despliegue en producción:** Ejecuta `npm run build` y sirve la carpeta `dist` con tu servidor favorito.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
