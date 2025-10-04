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
  isSpecial?: boolean;
  sectionId?: string;
  renderItem: (item: T) => React.ReactNode;
  subSections?: Array<SubSectionProps<T>>;
}

function MenuSection<T>({
  title,
  items,
  dividerImage,
  note,
  isSpecial = false,
  renderItem
}: MenuSectionProps<T>) {
  // No renderiza si no hay items
  if (!items || items.length === 0) return null;

  const renderItems = () => (
    <div className="row g-4 justify-content-center">
      {items.map((item, idx) => (
        <div key={idx} className="col-auto">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-') } className={`menu-section ${isSpecial ? 'special' : ''}`}>
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
  );
}

export default MenuSection;
