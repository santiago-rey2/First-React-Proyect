# 🍽️ Carta Restaurante - Asador A Ferreira

Una aplicación web moderna para mostrar la carta digital del restaurante Asador A Ferreira, desarrollada con React, TypeScript y Vite.

## � Descripción del Proyecto

Esta aplicación presenta una carta digital elegante y responsive para el restaurante Asador A Ferreira. Incluye secciones organizadas para diferentes tipos de platos, sistema de idiomas con banderas, guía de alérgenos y una interfaz moderna adaptada a todos los dispositivos.

### ✨ Características Principales

- 🎨 **Diseño Responsive**: Adaptado para móvil, tablet y desktop
- 🌍 **Multi-idioma**: Soporte para Español, Inglés, Francés y Portugués con banderas SVG
- 🥜 **Guía de Alérgenos**: Sistema completo de iconos para identificar alérgenos
- 📱 **Navegación Móvil**: Menú hamburguesa con drawer lateral
- 🔝 **Scroll to Top**: Botón flotante para navegación rápida
- 🎯 **Menús Dropdown**: Navegación organizada por categorías
- 📊 **Componentes Modulares**: Arquitectura bien organizada y reutilizable

## � Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para mejor desarrollo
- **Vite** - Build tool de nueva generación
- **CSS3** - Estilos modernos con variables CSS y Flexbox
- **Google Fonts** - Tipografía Inter para mejor legibilidad
- **Docker** - Containerización para despliegue
- **Nginx** - Servidor web para producción

## 📁 Estructura del Proyecto

```text
carta-restaurante/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── DropdownMenu/          # Menús desplegables reutilizables
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── DropdownMenu.css
│   │   │   ├── FlagIcons.tsx       # Componentes de banderas SVG
│   │   │   ├── useDropdownMenu.ts  # Hook personalizado
│   │   │   └── index.ts
│   │   ├── Layout/                 # Componentes de estructura
│   │   │   ├── Header.tsx
│   │   │   ├── Header.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.css
│   │   │   └── index.ts
│   │   ├── Menu/                   # Componentes del menú
│   │   │   ├── MenuItem.tsx
│   │   │   ├── MenuItem.css
│   │   │   ├── MenuSection.tsx
│   │   │   ├── MenuSection.css
│   │   │   ├── AllergenGuide.tsx
│   │   │   ├── AllergenIcon.tsx
│   │   │   └── index.ts
│   │   ├── UI/                     # Componentes de interfaz
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── ScrollToTop.css
│   │   │   └── index.ts
│   │   └── index.ts                # Barrel exports
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── dockerfile                      # Configuración Docker
├── nginx.conf                      # Configuración Nginx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## �️ Instalación y Configuración

### Requisitos Previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (incluido con Node.js) o yarn
- [Docker](https://www.docker.com/) (opcional, para despliegue con contenedores)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/santiago-rey2/First-React-Proyect.git
cd First-React-Proyect/carta-restaurante
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5174](http://localhost:5174)

## 🚀 Despliegue

### Opción 1: Build Tradicional

```bash
# Generar build de producción
npm run build

# Previsualizar build local
npm run preview
```

Los archivos estáticos se generarán en la carpeta `dist/`

### Opción 2: Docker (Recomendado)

#### Construcción de la Imagen

```bash
# Construir imagen Docker
docker build -t carta-restaurante .
```

#### Ejecutar Contenedor

```bash
# Ejecutar en puerto 80
docker run -p 80:80 carta-restaurante

# Ejecutar en puerto personalizado (ej: 3000)
docker run -p 3000:80 carta-restaurante
```

#### Docker Compose (Opcional)

Crear un archivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  carta-restaurante:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

```bash
# Ejecutar con Docker Compose
docker-compose up -d
```

## 📱 Funcionalidades Implementadas

### 🎯 Navegación
- **Header Responsive**: Logo, menús dropdown y botón hamburguesa
- **Menús Dropdown**: Platos, Vinos e Idiomas con hover effects
- **Navegación Móvil**: Drawer lateral con overlay

### 🌍 Sistema de Idiomas
- **4 Idiomas Soportados**: ES, EN, FR, PT
- **Banderas SVG**: Iconos vectoriales con colores auténticos
- **Dropdown de Idiomas**: Con bandera actual en el título

### 🍽️ Carta de Restaurante
- **Secciones Organizadas**: Sugerencias, Entrantes, Ensaladas, Mariscos, etc.
- **Items del Menú**: Nombre, precio, descripción y alérgenos
- **Imágenes Divisorias**: Entre secciones para mejor UX

### 🥜 Sistema de Alérgenos
- **14 Alérgenos**: Iconos para gluten, lácteos, frutos secos, etc.
- **Guía Visual**: Leyenda completa de alérgenos
- **Identificación Rápida**: En cada plato del menú

### 🎨 Interfaz de Usuario
- **Scroll to Top**: Botón flotante con animaciones
- **Responsive Design**: Breakpoints en 768px, 480px, 360px
- **Tipografía**: Google Fonts Inter para mejor legibilidad
- **Efectos Visuales**: Hover states, transiciones y sombras

## 🎨 Personalización CSS

### Variables CSS Principales

```css
:root {
  --wp--preset--color--theme-1: #ffffff;    /* Texto principal */
  --wp--preset--color--theme-2: #d29a5a;    /* Dorado principal */
  --wp--preset--color--theme-4: #1a1a1a;    /* Fondo oscuro */
  --wp--preset--color--theme-5: #2d2d2d;    /* Gris oscuro */
}
```

### Breakpoints Responsive

- **Desktop**: > 768px
- **Tablet**: 768px - 481px
- **Mobile**: 480px - 361px
- **Small Mobile**: ≤ 360px

## 🧩 Componentes Principales

### DropdownMenu
Componente reutilizable para menús desplegables con soporte para banderas.

### MenuSection
Muestra secciones completas del menú con items organizados.

### ScrollToTop
Botón flotante para navegación rápida con detección de scroll.

### FlagIcons
Componentes SVG para banderas de países con colores auténticos.

## 📜 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build de producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Estado del Proyecto

### ✅ Completado
- [x] Estructura base del proyecto
- [x] Componentes organizados en carpetas temáticas
- [x] Sistema de navegación responsive
- [x] Implementación de banderas SVG
- [x] Sistema completo de alérgenos
- [x] Botón ScrollToTop con animaciones
- [x] Optimización CSS (reducción del 45% en código)
- [x] Tipografía Inter integrada
- [x] Configuración Docker para despliegue

### 🔄 En Desarrollo
- [ ] Internacionalización completa (i18n)
- [ ] Modo oscuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Optimización de imágenes

### 📋 Futuras Mejoras
- [ ] Backend para gestión de contenido
- [ ] Sistema de reservas
- [ ] Integración con redes sociales
- [ ] Analytics y métricas

## 📞 Contacto

- **Restaurante**: Asador A Ferreira
- **Dirección**: C/ Bouzón, nº 2 Nantes 36969 – Pontevedra
- **Teléfono**: (+34) 986691139 / (+34) 687264726
- **Email**: angel10aferreira@hotmail.es

---

⭐ Si te gusta el proyecto, ¡dale una estrella en GitHub!