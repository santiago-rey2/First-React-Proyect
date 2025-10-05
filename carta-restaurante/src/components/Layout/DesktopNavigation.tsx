import DropdownMenu, { type DropdownItem } from '../DropdownMenu'

export interface NavigationConfig {
  key: string
  title: string
  titleFlagCode?: string
  items: DropdownItem[]
}

interface DesktopNavigationProps {
  navigationItems: NavigationConfig[]
  isDropdownActive: (key: string) => boolean
  handleDropdownToggle: (key: string) => void
  closeDropdown: () => void
  onLanguageChange?: (languageCode: string) => void  // Nueva prop
}

const DesktopNavigation = ({ 
  navigationItems, 
  isDropdownActive, 
  handleDropdownToggle, 
  closeDropdown,
  onLanguageChange
}: DesktopNavigationProps) => {
  return (
    <nav className="navigation desktop-nav" onMouseLeave={closeDropdown}>
      <ul>
        {navigationItems.map((navItem) => (
          <DropdownMenu
            key={navItem.key}
            title={navItem.title}
            titleFlagCode={navItem.titleFlagCode}
            items={navItem.items}
            isActive={isDropdownActive(navItem.key)}
            onToggle={() => handleDropdownToggle(navItem.key)}
            onClose={closeDropdown}
            onLanguageChange={onLanguageChange}  // Pasar la función
          />
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNavigation