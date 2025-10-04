import interiorView from '../../assets/Media/interior-view.webp';

const Footer = () => {
  return (
    <footer 
      className="footer"
      style={{
        backgroundImage: `url(${interiorView})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* Overlay para mejorar legibilidad del texto */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1
      }}></div>

      {/* Contenido con z-index mayor para estar por encima del overlay */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        
        <div className="footer-container">
          <div className="restaurant-info">
            <h3>Asador A Ferreira</h3>
            <p>C/ Bouzón, nº 2 Nantes 36969 – Pontevedra</p>
          </div>
          
          <div className="contact-info">
            <h4>Contacto</h4>
            <div className="contact-item">
              <div>
                <p>(+34) 986691139</p>
                <p>(+34) 687264726</p>
              </div>
            </div>
            
            <div className="contact-item">
              <p>angel10aferreira@hotmail.es</p>
            </div>
          </div>
          
          <div className="hours-info">
            <h4>Horarios</h4>
            <div className="hours-schedule">
              <p><strong>Lunes a Jueves</strong></p>
              <p>12:00 – 17:30</p>
              
              <p><strong>Viernes, Sábados y Domingos</strong></p>
              <p>12:00 – 17:30, 20:30-1:30</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Asador A Ferreira. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
