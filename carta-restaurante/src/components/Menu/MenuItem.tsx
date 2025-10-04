import type { Plato } from '../../models'
import AllergenIcon from './AllergenIcon'

interface MenuItemProps {
  item: Plato
}

const MenuItem = ({ item }: MenuItemProps) => {

  const formatearPrecio = () => {
    const precioBase = item.precio.toFixed(2);
    return item.precio_unidad
      ? `${precioBase} € / ${item.precio_unidad}`
      : `${precioBase} €`;
  };
  return (
    <div className="menu-item">
      <div className="item-header">
        <h6 className="item-name">{item.nombre}</h6>
        <span className="item-price">{formatearPrecio()}</span>
      </div>
      
      {/* Una sola línea decorativa que siempre aparece */}
      <div className="decorative-line"></div>

      {item.descripcion && (
        <p className="item-description">{item.descripcion}</p>
      )}

      {item.alergenos && item.alergenos.length > 0 && (
        <div className="allergen-icons">
          {item.alergenos.map((alergenos, index) => (
            <AllergenIcon key={index} type={alergenos} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuItem
