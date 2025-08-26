# DropdownMenu Component

Un componente reutilizable para crear menús desplegables con estilos consistentes.

## Características

- ✅ Totalmente reutilizable
- ✅ TypeScript support
- ✅ Estilos responsivos
- ✅ Animaciones suaves
- ✅ Eventos de hover y click
- ✅ Auto-close al hacer click en un item

## Uso Básico

```tsx
import DropdownMenu, { type DropdownItem } from './DropdownMenu'
import { useDropdownMenu } from './useDropdownMenu'

const MyComponent = () => {
  const { handleDropdownToggle, closeDropdown, isDropdownActive } = useDropdownMenu()

  const menuItems: DropdownItem[] = [
    { href: "#item1", label: "Item 1" },
    { href: "#item2", label: "Item 2" },
    { href: "#item3", label: "Item 3" }
  ]

  return (
    <nav onMouseLeave={closeDropdown}>
      <ul>
        <DropdownMenu
          title="MI MENÚ"
          items={menuItems}
          isActive={isDropdownActive('menu1')}
          onToggle={() => handleDropdownToggle('menu1')}
          onClose={closeDropdown}
          onItemClick={(href) => console.log('Clicked:', href)}
        />
      </ul>
    </nav>
  )
}
```

## Props

### DropdownMenuProps

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | `string` | ✅ | Texto del botón del menú |
| `items` | `DropdownItem[]` | ✅ | Array de items del menú |
| `isActive` | `boolean` | ❌ | Si el menú está activo (abierto) |
| `onToggle` | `() => void` | ❌ | Función para abrir/cerrar el menú |
| `onClose` | `() => void` | ❌ | Función para cerrar el menú |
| `onItemClick` | `(href: string) => void` | ❌ | Función ejecutada al hacer click en un item |

### DropdownItem

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `href` | `string` | ✅ | URL o ancla del link |
| `label` | `string` | ✅ | Texto visible del item |

## Hook useDropdownMenu

Proporciona la lógica de estado para manejar múltiples dropdowns:

```tsx
const {
  activeDropdown,        // string | null - ID del dropdown activo
  handleDropdownToggle,  // (id: string) => void - Alternar dropdown
  closeDropdown,         // () => void - Cerrar todos los dropdowns
  isDropdownActive      // (id: string) => boolean - Verificar si está activo
} = useDropdownMenu()
```

## Ejemplo Múltiples Dropdowns

```tsx
<nav onMouseLeave={closeDropdown}>
  <ul>
    <DropdownMenu
      title="MENÚ 1"
      items={menu1Items}
      isActive={isDropdownActive('menu1')}
      onToggle={() => handleDropdownToggle('menu1')}
      onClose={closeDropdown}
    />
    <DropdownMenu
      title="MENÚ 2"
      items={menu2Items}
      isActive={isDropdownActive('menu2')}
      onToggle={() => handleDropdownToggle('menu2')}
      onClose={closeDropdown}
    />
  </ul>
</nav>
```

## Personalización CSS

Los estilos están en `DropdownMenu.css` y usan variables CSS:

- `--wp--preset--color--theme-4`: Color de fondo del menú
- `--wp--preset--color--theme-2`: Color de borde y hover
- Responsive breakpoint: `769px`

## Archivos del Componente

- `DropdownMenu.tsx` - Componente principal
- `DropdownMenu.css` - Estilos del componente
- `useDropdownMenu.ts` - Hook para manejo de estado
