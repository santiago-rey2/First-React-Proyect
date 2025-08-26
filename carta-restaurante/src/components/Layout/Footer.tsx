import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="restaurant-info">
          <h3>Asador A Ferreira</h3>
          <p>C/ Bouzón, nº 2 Nantes 36969 – Pontevedra</p>
        </div>
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <p>(+34) 986691139</p>
              <p>(+34) 687264726</p>
            </div>
          </div>
          
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
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
    </footer>
  )
}

export default Footer
