import './AllergenIcon.css'
import glutenSvg from '../../assets/Alergenos/gluten.svg'
import celerySvg from '../../assets/Alergenos/celery.svg'
import nutsSvg from '../../assets/Alergenos/nuts.svg'
import sesameSvg from '../../assets/Alergenos/sesame.svg'
import peanutSvg from '../../assets/Alergenos/peanut.svg'
import milkSvg from '../../assets/Alergenos/milk.svg'
import fishSvg from '../../assets/Alergenos/fish.svg'
import shellfishSvg from '../../assets/Alergenos/shellfish.svg'
import crustaceansSvg from '../../assets/Alergenos/crustaceans.svg'
import eggSvg from '../../assets/Alergenos/egg.svg'
import soySvg from '../../assets/Alergenos/soy.svg'
import lupinsSvg from '../../assets/Alergenos/lupins.svg'
import mustardSvg from '../../assets/Alergenos/mustard.svg'
import sulfitesSvg from '../../assets/Alergenos/sulfites.svg'

interface AllergenIconProps {
  type: string
}

const allergenData: { [key: string]: { name: string; svgUrl: string } } = {
  gluten: { 
    name: 'Gluten', 
    svgUrl: glutenSvg 
  },
  celery: { 
    name: 'Apio', 
    svgUrl: celerySvg 
  },
  nuts: { 
    name: 'Frutos con Cáscara', 
    svgUrl: nutsSvg 
  },
  sesame: { 
    name: 'Sésamo', 
    svgUrl: sesameSvg 
  },
  peanut: { 
    name: 'Cacahuete', 
    svgUrl: peanutSvg 
  },
  milk: { 
    name: 'Lácteos', 
    svgUrl: milkSvg 
  },
  fish: { 
    name: 'Pescado', 
    svgUrl: fishSvg 
  },
  shellfish: { 
    name: 'Molusco', 
    svgUrl: shellfishSvg 
  },
  crustaceans: { 
    name: 'Crustáceo', 
    svgUrl: crustaceansSvg 
  },
  egg: { 
    name: 'Huevo', 
    svgUrl: eggSvg 
  },
  soy: { 
    name: 'Soja', 
    svgUrl: soySvg 
  },
  lupins: { 
    name: 'Altramuces', 
    svgUrl: lupinsSvg 
  },
  mustard: { 
    name: 'Mostaza', 
    svgUrl: mustardSvg 
  },
  sulfites: { 
    name: 'Sulfitos', 
    svgUrl: sulfitesSvg 
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
