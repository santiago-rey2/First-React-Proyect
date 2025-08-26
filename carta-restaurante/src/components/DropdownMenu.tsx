import './DropdownMenu.css'

export interface DropdownItem {
  href: string
  label: string
}

export interface DropdownMenuProps {
  title: string
  items: DropdownItem[]
  isActive?: boolean
  onToggle?: () => void
  onClose?: () => void
  onItemClick?: (href: string) => void
}

const DropdownMenu = ({ 
  title, 
  items, 
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
        {title}
        <span className="dropdown-arrow">▼</span>
      </button>
      <div className={`dropdown-menu ${isActive ? 'show' : ''}`}>
        {items.map((item, index) => (
          <a 
            key={index}
            href={item.href} 
            onClick={() => handleItemClick(item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </li>
  )
}

export default DropdownMenu
