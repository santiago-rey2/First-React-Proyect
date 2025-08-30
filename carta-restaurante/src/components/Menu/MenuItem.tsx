import AllergenIcon from './AllergenIcon'

interface MenuItemProps {
  item: {
    name: string
    price: string
    description?: string
    allergens?: string[]
  }
}

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <div className="menu-item">
      <div className="item-header">
        <h6 className="item-name">{item.name}</h6>
        <span className="item-price">{item.price}</span>
      </div>
      
      {/* Una sola línea decorativa que siempre aparece */}
      <div className="decorative-line"></div>
      
      {item.description && (
        <p className="item-description">{item.description}</p>
      )}
      
      {item.allergens && item.allergens.length > 0 && (
        <div className="allergen-icons">
          {item.allergens.map((allergen, index) => (
            <AllergenIcon key={index} type={allergen} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuItem
