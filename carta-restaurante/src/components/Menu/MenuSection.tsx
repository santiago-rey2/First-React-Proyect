import MenuItem from './MenuItem'
import { Translations } from '../../utils/Translations'

interface MenuItemData {
  name: string
  price: string
  description?: string
  allergens?: string[]
}

interface MenuSectionData {
  category: string
  items: MenuItemData[]
}

interface MenuSectionProps {
  title: string
  items: MenuItemData[] | MenuSectionData[]
  isSpecial?: boolean
  note?: string
  dividerImage?: string
}

const MenuSection = ({ title, items, isSpecial = false, note, dividerImage }: MenuSectionProps) => {
  const translations = Translations()
  
  // Crear ID único basado en el título
  const sectionId = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');

  // Mapear nombres de subsecciones a las traducciones ya existentes
  const getSubsectionTranslation = (categoryName: string): string => {
    // Normalizar el nombre para hacer coincidencias más robustas
    const normalizedName = categoryName.toLowerCase().trim()
    
    // Mapeo usando las traducciones ya definidas en Translations.ts
    const categoryMap: { [key: string]: string } = {
      // Para Menú - Sugerencias del Día
      'entrantes': translations.SECTION_SUGGESTIONS_STARTERS,
      'platos principales': translations.SECTION_SUGGESTIONS_MAIN,
      'postres': translations.SECTION_SUGGESTIONS_DESSERTS,
      
      // Si necesitas más subsecciones para otras páginas, las puedes agregar aquí
      // usando las traducciones que ya tienes en Translations.ts
    }
    
    // Buscar coincidencia exacta primero
    if (categoryMap[normalizedName]) {
      return categoryMap[normalizedName]
    }
    
    // Buscar coincidencias parciales
    for (const [key, translation] of Object.entries(categoryMap)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return translation
      }
    }
    
    // Si no hay coincidencia, devolver el nombre original
    console.warn(`No translation found for subsection: ${categoryName}`)
    return categoryName
  }

  const renderItems = () => {
    if (!items || items.length === 0) return null

    // Si es sección especial (sugerencias del día), tendrá subsecciones
    if (isSpecial && Array.isArray(items) && items.length > 0 && 'category' in items[0]) {
      return (items as MenuSectionData[]).map((section, index) => (
        <div key={index} className="menu-subsection mb-4">
          <h4 className="subsection-title">
            {getSubsectionTranslation(section.category)}
          </h4>
          <div className="row g-4 justify-content-center">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="col-auto">
                <MenuItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ))
    }

    // Para secciones normales con boxes de 500px
    return (
      <div className="row g-4 justify-content-center">
        {(items as MenuItemData[]).map((item, index) => (
          <div key={index} className="col-auto">
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id={sectionId} className={`menu-section ${isSpecial ? 'special' : ''}`}>
      <div className="container-fluid">
        <div className="section-container">
          {/* Imagen divisora para móvil - aparece antes del título */}
          {dividerImage && (
            <div className="divider-image mobile-only">
              <img src={dividerImage} alt="Divisor de sección" />
            </div>
          )}
          
          {/* Título para móvil - aparece después de la imagen */}
          {dividerImage && (
            <h2 className="section-title mobile-only">{title}</h2>
          )}
          
          {/* Contenedor con efecto hero para desktop/tablet */}
          <div className="title-container">
            {/* Imagen divisora para desktop/tablet - con background como hero */}
            {dividerImage && (
              <div 
                className="divider-image desktop-only"
                style={{
                  backgroundImage: `url(${dividerImage})`
                }}
              >
                <h2 className="section-title desktop-only">{title}</h2>
              </div>
            )}
            
            {/* Título para secciones sin imagen */}
            {!dividerImage && (
              <><h2 className="section-title mobile-only">{title}</h2>
              <h2 className="section-title desktop-only">{title}</h2></>
            )}
          </div>
          
          {note && <p className="section-note">{note}</p>}
          {renderItems()}
        </div>
      </div>
    </section>
  )
}

export default MenuSection
