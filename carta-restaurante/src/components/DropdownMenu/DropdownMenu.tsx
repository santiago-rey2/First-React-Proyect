import { Link } from 'react-router-dom'
import './DropdownMenu.css'
import Flag from './FlagIcons'

export interface DropdownItem {
  href: string
  label: string
  flagCode?: string
}

export interface DropdownMenuProps {
  title: string
  items: DropdownItem[]
  titleFlagCode?: string
  isActive?: boolean
  onToggle?: () => void
  onClose?: () => void
  onItemClick?: (href: string) => void
}

const DropdownMenu = ({ 
  title, 
  items, 
  titleFlagCode,
  isActive = false, 
  onToggle, 
  onClose,
  onItemClick 
}: DropdownMenuProps) => {
  const handleItemClick = (href: string) => {
    if (onItemClick) {
      onItemClick(href)
    }
    if (onClose) {
      onClose()
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
          <Link 
            key={index}
            to={item.href} 
            onClick={() => handleItemClick(item.href)}
          >
            {item.flagCode && <Flag country={item.flagCode} className="flag-icon-menu" />}
            {item.label}
          </Link>
        ))}
      </div>
    </li>
  )
}

export default DropdownMenu
