import AllergenIcon from './AllergenIcon'
import './AllergenGuide.css'

const AllergenGuide = () => {
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
    <section className="allergen-guide">
      <div className="container-fluid">
        <div className="guide-container">
          <h2 className="guide-title">Guía Alérgenos</h2>
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
