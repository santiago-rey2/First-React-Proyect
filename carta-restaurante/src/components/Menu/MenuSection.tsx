import React from "react";

interface SubSectionProps<T> {
  title: string;
  items: T[];
  dividerImage?: string;
  renderItem: (item: T) => React.ReactNode;
}

interface MenuSectionProps<T> {
  title: string;
  items: T[];
  dividerImage?: string;
  note?: string;
  renderItem: (item: T) => React.ReactNode;
  subSections?: Array<SubSectionProps<T>>;
}

function MenuSection<T>({
  title,
  items,
  dividerImage,
  note,
  renderItem,
  subSections,
}: MenuSectionProps<T>) {
  // No renderiza si no hay items
  if (!items || items.length === 0) return null;

  return (
    <section className="menu-section">
      {dividerImage && (
        <img src={dividerImage} alt="" className="divider-image" />
      )}
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{renderItem(item)}</li>
        ))}
      </ul>

      {/* Renderiza subsecciones si existen */}
      {subSections &&
        subSections.map((sub, i) =>
          sub.items && sub.items.length > 0 ? (
            <div key={i} className="menu-subsection">
              {sub.dividerImage && (
                <img src={sub.dividerImage} alt="" className="divider-image" />
              )}
              <h3>{sub.title}</h3>
              <ul>
                {sub.items.map((item, idx) => (
                  <li key={idx}>{sub.renderItem(item)}</li>
                ))}
              </ul>
            </div>
          ) : null
        )}
    </section>
  );
}

export default MenuSection;
