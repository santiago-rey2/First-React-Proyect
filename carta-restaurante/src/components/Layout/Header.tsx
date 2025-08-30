import { useState } from 'react'
import DropdownMenu, { type DropdownItem } from '../DropdownMenu'
import { useDropdownMenu } from '../DropdownMenu/useDropdownMenu'
import { Link } from 'react-router-dom'
import { Translations } from '../../utils/Translations'
import logo from '/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { handleDropdownToggle, closeDropdown, isDropdownActive } = useDropdownMenu()

  // Datos de los menús desplegables
  const platosItems: DropdownItem[] = [
    { href: "/menu", label: "Menú" },
    { href: "#sugerencias-del-dia", label: "Sugerencias del Día" },
    { href: "#entrantes", label: "Entrantes" },
    { href: "#ensaladas", label: "Ensaladas" },
    { href: "#mariscos", label: "Mariscos" },
    { href: "#carnes", label: "Carnes" },
    { href: "#pescados", label: "Pescados" },
    { href: "#arroces", label: "Arroces" },
    { href: "#postres-caseros", label: "Postres" }
  ]

  const vinosItems: DropdownItem[] = [
    { href: "/wines", label: "Vinos" },
    { href: "#blancos", label: "Vinos Blancos" },
    { href: "#rosados", label: "Vinos Rosados" },
    { href: "#espumosos", label: "Espumosos" },
    { href: "#licores", label: "Licores" }
  ]

  const idiomaItems: DropdownItem[] = [
    { href: "#es", label: "Español", flagCode: "es" },
    { href: "#en", label: "English", flagCode: "en" },
    { href: "#fr", label: "Français", flagCode: "fr" },
    { href: "#pt", label: "Português", flagCode: "pt" }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img 
            src={logo} 
            alt="Asador A Ferreira" 
            className="logo-image"
          />
        </div>
        
        {/* Navegación desktop */}
        <nav className="navigation desktop-nav" onMouseLeave={closeDropdown}>
          <ul>
            <DropdownMenu
              title={Translations().NAVIGATION_HOME}
              items={platosItems}
              isActive={isDropdownActive('platos')}
              onToggle={() => handleDropdownToggle('platos')}
              onClose={closeDropdown}
            />
            <DropdownMenu
              title={Translations().NAVIGATION_WINES}
              items={vinosItems}
              isActive={isDropdownActive('vinos')}
              onToggle={() => handleDropdownToggle('vinos')}
              onClose={closeDropdown}
            />
            <DropdownMenu
              title={Translations().NAVIGATION_LANGUAGE}
              titleFlagCode={Translations().NAVIGATION_LANGUAGE_FLAG}
              items={idiomaItems}
              isActive={isDropdownActive('idioma')}
              onToggle={() => handleDropdownToggle('idioma')}
              onClose={closeDropdown}
            />
          </ul>
        </nav>

        {/* Botón menú hamburguesa para móvil */}
        <button className="menu-toggle mobile-only" onClick={toggleMenu}>
          <div className="custom-hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Menú drawer para móvil */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
          <div className="mobile-menu-content">
            <button className="close-menu" onClick={closeMenu}>×</button>
            <nav className="mobile-navigation">
              <ul>
                <li><a href="/menu" onClick={closeMenu}>Menú</a></li>
                <li><a href="#sugerencias-del-dia" onClick={closeMenu}>Sugerencias del Día</a></li>
                <li><a href="#entrantes" onClick={closeMenu}>Entrantes</a></li>
                <li><a href="#ensaladas" onClick={closeMenu}>Ensaladas</a></li>
                <li><a href="#mariscos" onClick={closeMenu}>Mariscos</a></li>
                <li><a href="#carnes" onClick={closeMenu}>Carnes</a></li>
                <li><a href="#pescados" onClick={closeMenu}>Pescados</a></li>
                <li><a href="#arroces" onClick={closeMenu}>Arroces</a></li>
                <li><a href="#postres-caseros" onClick={closeMenu}>Postres</a></li>
                <li className="menu-divider"></li>
                <li><Link to="/wines" onClick={closeMenu}>Nuestros Vinos</Link></li>
                <li><a href="#idioma" onClick={closeMenu}>Idioma</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
