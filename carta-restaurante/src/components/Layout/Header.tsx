import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDropdownMenu } from '../DropdownMenu/useDropdownMenu'
import { ASSETS } from '../conf'
import DesktopNavigation, { type NavigationConfig } from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

interface HeaderProps {
  navigationItems: NavigationConfig[]
}

const Header = ({ navigationItems }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { handleDropdownToggle, closeDropdown, isDropdownActive } = useDropdownMenu()
  const { i18n } = useTranslation()  // Hook de i18next

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Función para cambiar el idioma
  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode)
      // Aquí puedes agregar lógica adicional como:
      // - Guardar la preferencia en localStorage
      // - Recargar datos del backend con el nuevo idioma
      localStorage.setItem('preferredLanguage', languageCode)
      console.log(`Idioma cambiado a: ${languageCode}`)
    } catch (error) {
      console.error('Error al cambiar idioma:', error)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img 
            src={ASSETS.LOGO} 
            alt="Asador A Ferreira" 
            className="logo-image"
          />
        </Link>
        
        {/* Navegación Desktop */}
        <DesktopNavigation
          navigationItems={navigationItems}
          isDropdownActive={isDropdownActive}
          handleDropdownToggle={handleDropdownToggle}
          closeDropdown={closeDropdown}
          onLanguageChange={handleLanguageChange}  // Pasar la función
        />

        {/* Botón menú hamburguesa */}
        <button className="menu-toggle mobile-only" onClick={toggleMenu}>
          <div className="custom-hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </button>

        {/* Navegación Móvil */}
        <MobileNavigation
          navigationItems={navigationItems}
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          onLanguageChange={handleLanguageChange}  // Pasar la función
        />
      </div>
    </header>
  )
}

export default Header
