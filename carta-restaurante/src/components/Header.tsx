import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img 
            src="https://asador-a-ferreira.es/wp-content/uploads/2025/04/Logo_Header_Recortada_sin_Fondo.png" 
            alt="Asador A Ferreira" 
            className="logo-image"
          />
        </div>
        
        {/* Navegación desktop */}
        <nav className="navigation desktop-nav" onMouseLeave={closeDropdown}>
          <ul>
            <li className="dropdown-item">
              <button 
                className="dropdown-toggle"
                onMouseEnter={() => handleDropdownToggle('platos')}
                onClick={() => handleDropdownToggle('platos')}
              >
                NUESTROS PLATOS
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'platos' ? 'show' : ''}`}>
                <a href="#sugerencias-del-dia" onClick={closeDropdown}>Sugerencias del Día</a>
                <a href="#entrantes" onClick={closeDropdown}>Entrantes</a>
                <a href="#ensaladas" onClick={closeDropdown}>Ensaladas</a>
                <a href="#mariscos" onClick={closeDropdown}>Mariscos</a>
                <a href="#carnes" onClick={closeDropdown}>Carnes</a>
                <a href="#pescados" onClick={closeDropdown}>Pescados</a>
                <a href="#arroces" onClick={closeDropdown}>Arroces</a>
                <a href="#postres-caseros" onClick={closeDropdown}>Postres</a>
              </div>
            </li>
            <li className="dropdown-item">
              <button 
                className="dropdown-toggle"
                onMouseEnter={() => handleDropdownToggle('vinos')}
                onClick={() => handleDropdownToggle('vinos')}
              >
                NUESTROS VINOS
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'vinos' ? 'show' : ''}`}>
                <a href="#tintos" onClick={closeDropdown}>Vinos Tintos</a>
                <a href="#blancos" onClick={closeDropdown}>Vinos Blancos</a>
                <a href="#rosados" onClick={closeDropdown}>Vinos Rosados</a>
                <a href="#espumosos" onClick={closeDropdown}>Espumosos</a>
                <a href="#licores" onClick={closeDropdown}>Licores</a>
              </div>
            </li>
            <li className="dropdown-item">
              <button 
                className="dropdown-toggle"
                onMouseEnter={() => handleDropdownToggle('idioma')}
                onClick={() => handleDropdownToggle('idioma')}
              >
                ESPAÑOL
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'idioma' ? 'show' : ''}`}>
                <a href="#es" onClick={closeDropdown}>Español</a>
                <a href="#en" onClick={closeDropdown}>English</a>
                <a href="#fr" onClick={closeDropdown}>Français</a>
                <a href="#pt" onClick={closeDropdown}>Português</a>
              </div>
            </li>
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
                <li><a href="#sugerencias-del-dia" onClick={closeMenu}>Sugerencias del Día</a></li>
                <li><a href="#entrantes" onClick={closeMenu}>Entrantes</a></li>
                <li><a href="#ensaladas" onClick={closeMenu}>Ensaladas</a></li>
                <li><a href="#mariscos" onClick={closeMenu}>Mariscos</a></li>
                <li><a href="#carnes" onClick={closeMenu}>Carnes</a></li>
                <li><a href="#pescados" onClick={closeMenu}>Pescados</a></li>
                <li><a href="#arroces" onClick={closeMenu}>Arroces</a></li>
                <li><a href="#postres-caseros" onClick={closeMenu}>Postres</a></li>
                <li className="menu-divider"></li>
                <li><a href="#vinos" onClick={closeMenu}>Nuestros Vinos</a></li>
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
