import { Link } from 'react-router-dom'
import type { NavigationConfig } from './DesktopNavigation'
import Flag from '../DropdownMenu/FlagIcons'

interface MobileNavigationProps {
  navigationItems: NavigationConfig[]
  isMenuOpen: boolean
  closeMenu: () => void
  onLanguageChange?: (languageCode: string) => void
}

const MobileNavigation = ({ 
  navigationItems, 
  isMenuOpen, 
  closeMenu,
  onLanguageChange
}: MobileNavigationProps) => {
  const getFlatMenuItems = () => {
    const flatItems: Array<{ 
      href: string
      label: string
      isDivider?: boolean
      flagCode?: string
      isLanguage?: boolean
      languageCode?: string
    }> = []
    
    navigationItems.forEach((navItem, index) => {
      flatItems.push(...navItem.items)
      
      if (index < navigationItems.length - 1) {
        flatItems.push({ href: '', label: '', isDivider: true })
      }
    })
    
    return flatItems
  }

  const handleLanguageClick = (languageCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode)
    }
    closeMenu()
  }

  return (
    <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      <div className="mobile-menu-content">
        <button className="close-menu" onClick={closeMenu}>×</button>
        <nav className="mobile-navigation">
          <ul>
            {getFlatMenuItems().map((item, index) => {
              if (item.isDivider) {
                return <li key={`divider-${index}`} className="menu-divider"></li>
              }
              
              // Si es un item de idioma
              if (item.isLanguage && item.languageCode) {
                return (
                  <li key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                      className="mobile-language-item"
                      onClick={() => handleLanguageClick(item.languageCode!)}
                      style={{ 
                        display: 'inline-flex',
                        width: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {item.flagCode && <Flag country={item.flagCode} className="flag-icon-mobile" />}
                      {item.label}
                    </button>
                  </li>
                )
              }
              
              // Si es un enlace normal
              return (
                <li key={index}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default MobileNavigation