import type { Vino } from '../../models'
import AllergenIcon from './AllergenIcon'

interface MenuItemProps {
  item: Vino
}

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <div className="menu-item">
      <div className="item-header">
        <h6 className="item-name">{item.nombre}</h6>
        <span className="item-price">{item.precio} €</span>
      </div>
      
      {/* Una sola línea decorativa que siempre aparece */}
      <div className="decorative-line"></div>

      {item.bodega && (
        <p className="item-description">{item.bodega.nombre}</p>
      )}

      {item.enologo && (
        <p className="item-description">{item.enologo.nombre}</p>
      )}

      {item.uvas && item.uvas.length > 0 && (
        <p className="item-description">
          <b>Uvas:</b> {item.uvas.map(uva => uva.nombre).join(", ")}
        </p>
      )}

        <div className="allergen-icons">
            <AllergenIcon key={"sulfites"} type={"sulfites"} />
        </div>

    </div>
  )
}

export default MenuItem
