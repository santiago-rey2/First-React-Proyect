import './AllergenIcon.css'

interface AllergenIconProps {
  type: string
}

const allergenData: { [key: string]: { name: string; svgUrl: string } } = {
  gluten: { 
    name: 'Gluten', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/gluten.svg' 
  },
  celery: { 
    name: 'Apio', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/celery.svg' 
  },
  nuts: { 
    name: 'Frutos con Cáscara', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/nuts.svg' 
  },
  sesame: { 
    name: 'Sésamo', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/sesame.svg' 
  },
  peanut: { 
    name: 'Cacahuete', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/peanut.svg' 
  },
  milk: { 
    name: 'Lácteos', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/milk.svg' 
  },
  fish: { 
    name: 'Pescado', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/fish.svg' 
  },
  shellfish: { 
    name: 'Molusco', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/shellfish.svg' 
  },
  crustaceans: { 
    name: 'Crustáceo', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/crustaceans.svg' 
  },
  egg: { 
    name: 'Huevo', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/egg.svg' 
  },
  soy: { 
    name: 'Soja', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/soy.svg' 
  },
  lupins: { 
    name: 'Altramuces', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/lupins.svg' 
  },
  mustard: { 
    name: 'Mostaza', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/mustard.svg' 
  },
  sulfites: { 
    name: 'Sulfitos', 
    svgUrl: 'https://asador-a-ferreira.es/wp-content/uploads/2025/02/sulfites.svg' 
  }
}

const AllergenIcon = ({ type }: AllergenIconProps) => {
  const allergen = allergenData[type]
  
  if (!allergen) return null

  return (
    <img
      src={allergen.svgUrl}
      alt={allergen.name}
      title={allergen.name}
      className="allergen-icon"
      aria-label={`Contiene ${allergen.name}`}
    />
  )
}

export default AllergenIcon
