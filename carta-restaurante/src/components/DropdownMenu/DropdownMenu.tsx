import { Link } from 'react-router-dom'
import Flag from './FlagIcons'

export interface DropdownItem {
  href: string
  label: string
  flagCode?: string
  isLanguage?: boolean  // Nueva prop para identificar items de idioma
  languageCode?: string // Código del idioma (es, en, pt)
}

export interface DropdownMenuProps {
  title: string
  items: DropdownItem[]
  titleFlagCode?: string
  isActive?: boolean
  onToggle?: () => void
  onClose?: () => void
  onItemClick?: (href: string) => void
  onLanguageChange?: (languageCode: string) => void  // Nueva prop
}

const DropdownMenu = ({ 
  title, 
  items, 
  titleFlagCode,
  isActive = false, 
  onToggle, 
  onClose,
  onItemClick,
  onLanguageChange
}: DropdownMenuProps) => {
  const handleItemClick = (item: DropdownItem) => {
    // Si es un cambio de idioma
    if (item.isLanguage && item.languageCode && onLanguageChange) {
      onLanguageChange(item.languageCode)
      if (onClose) onClose()
      return
    }

    // Si es un enlace normal
    if (onItemClick) {
      onItemClick(item.href)
    }
    if (onClose) {
      onClose()
    }
    
    // Si es un ancla, hacer scroll suave
    if (item.href.startsWith('#')) {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <li className="dropdown-item">
      <button 
        className="dropdown-toggle"
        onMouseEnter={onToggle}
        onClick={onToggle}
      >
        {titleFlagCode && <Flag country={titleFlagCode} className="flag-icon-btn" />}
        {title}
        <span className="dropdown-arrow">▼</span>
      </button>
      <div className={`dropdown-menu ${isActive ? 'show' : ''}`}>
        {items.map((item, index) => (
          item.isLanguage ? (
            // Para items de idioma, usar button en lugar de Link
            <button
              key={index}
              className="dropdown-language-item"
              onClick={() => handleItemClick(item)}
            >
              {item.flagCode && <Flag country={item.flagCode} className="flag-icon-menu" />}
              {item.label}
            </button>
          ) : (
            // Para enlaces normales, usar Link
            <Link 
              key={index}
              to={item.href} 
              onClick={() => handleItemClick(item)}
            >
              {item.flagCode && <Flag country={item.flagCode} className="flag-icon-menu" />}
              {item.label}
            </Link>
          )
        ))}
      </div>
    </li>
  )
}

export default DropdownMenu
