import React from 'react';
import './styles.scss';

const DoubleTitulacion = () => {
  return (
    <div className="double-titulacion-container">
      <div className="content-wrapper">
        <h1 className="main-title">Doble Titulación 1</h1>
        
        <div className="hero-section">
          <div className="overlay">
            <div className="hero-content">
              <h2 className="hero-title">Internacionaliza tu MBA y amplía tu visión global</h2>
              <p className="hero-description">
                Vive experiencias académicas en el extranjero que potencian tu perfil
                profesional y amplían tus oportunidades laborales.
              </p>
              
              <div className="cards-container">
                <div className="info-card">
                  <h3 className="card-title">Misiones Internacionales:</h3>
                  <p className="card-description">
                    Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.
                  </p>
                </div>
                
                <div className="info-card">
                  <h3 className="card-title">Summer Business School:</h3>
                  <p className="card-description">
                    Programa intersemestral con docentes internacionales para complementar tu formación
                  </p>
                </div>
                
                <div className="info-card">
                  <h3 className="card-title">Doble Titulación:</h3>
                  <p className="card-description">
                    A partir de 2025, opción de obtener un título adicional con la Universidad Pompeu Fabra en Barcelona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleTitulacion;