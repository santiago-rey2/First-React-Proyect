import MenuItem from './MenuItem'
import { Translations } from '../../utils/Translations'
import { type Plato } from '../../models/platosDTO'

interface MenuSectionProps {
  title: string
  items: Plato[]
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
    const normalizedName = categoryName.toLowerCase().trim()
    const categoryMap: { [key: string]: string } = {
      'entrantes': translations.SECTION_SUGGESTIONS_STARTERS,
      'platos principales': translations.SECTION_SUGGESTIONS_MAIN,
      'postres': translations.SECTION_SUGGESTIONS_DESSERTS,
    }
    if (categoryMap[normalizedName]) {
      return categoryMap[normalizedName]
    }
    for (const [key, translation] of Object.entries(categoryMap)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return translation
      }
    }
    console.warn(`No translation found for subsection: ${categoryName}`)
    return categoryName
  }

  const renderItems = () => {
    if (!items || items.length === 0) return null

    // Si es sección especial (sugerencias del día), agrupa por categoría
    if (isSpecial) {
      // Agrupa los platos por categoria.nombre
      const grouped = items.reduce<Record<string, Plato[]>>((acc, plato) => {
        const cat = plato.categoria?.nombre || 'Otros'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(plato)
        return acc
      }, {})

      return Object.entries(grouped).map(([category, platos], index) => (
        <div key={index} className="menu-subsection mb-4">
          <h4 className="subsection-title">
            {getSubsectionTranslation(category)}
          </h4>
          <div className="row g-4 justify-content-center">
            {platos.map((item) => (
              <div key={item.id} className="col-auto">
                <MenuItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ))
    }

    // Para secciones normales
    return (
      <div className="row g-4 justify-content-center">
        {items.map((item) => (
          <div key={item.id} className="col-auto">
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
              <>
                <h2 className="section-title mobile-only">{title}</h2>
                <h2 className="section-title desktop-only">{title}</h2>
              </>
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
