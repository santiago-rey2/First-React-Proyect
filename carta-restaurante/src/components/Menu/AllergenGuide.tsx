import AllergenIcon from './AllergenIcon'

interface AllergenGuideProps {
  dividerImage?: string
  title?: string
}

const AllergenGuide = ({ dividerImage, title = "Guía Alérgenos" }: AllergenGuideProps) => {
  const allergens = [
    { type: 'gluten', name: 'Gluten' },
    { type: 'celery', name: 'Apio' },
    { type: 'nuts', name: 'Frutos con Cáscara' },
    { type: 'sesame', name: 'Sésamo' },
    { type: 'peanut', name: 'Cacahuete' },
    { type: 'milk', name: 'Lácteos' },
    { type: 'fish', name: 'Pescado' },
    { type: 'shellfish', name: 'Molusco' },
    { type: 'crustaceans', name: 'Crustáceo' },
    { type: 'egg', name: 'Huevo' },
    { type: 'soy', name: 'Soja' },
    { type: 'lupins', name: 'Altramuces' },
    { type: 'mustard', name: 'Mostaza' },
    { type: 'sulfites', name: 'Sulfitos' }
  ]

  return (
    <section className="allergen-guide menu-section">
      <div className="container-fluid">
        <div className="guide-container section-container">
          {/* Imagen divisoria para móvil */}
          {dividerImage && (
            <div className="divider-image mobile-only">
              <img src={dividerImage} alt="Divisor de sección" />
            </div>
          )}
          {/* Título para móvil */}
          {dividerImage && (
            <h2 className="section-title mobile-only">{title}</h2>
          )}
          {/* Contenedor con efecto hero para desktop/tablet */}
          <div className="title-container">
            {/* Imagen divisoria para desktop/tablet */}
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
          <div className="row">
            {allergens.map((allergen) => (
              <div key={allergen.type} className="col">
                <div className="allergen-item h-100">
                  <AllergenIcon type={allergen.type} />
                  <span className="allergen-name">{allergen.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllergenGuide
