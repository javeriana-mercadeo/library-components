'use client'
import React, { useEffect, useState } from 'react'
import '../styles/laboratories.scss'

const LabSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  

  const buttonColor = "#FF5733"; 
  
  const labImages = [
    {
      id: 1,
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
      label: 'Nombre del Laboratorio'
    },
    {
      id: 2,
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
      label: 'Nombre del Laboratorio'
    },
    {
      id: 3,
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
      label: 'Nombre del Laboratorio'
    },
    {
      id: 4,
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      label: 'Nombre del Laboratorio'
    }
  ];

  // Verificar si estamos en el navegador antes de acceder a window
  useEffect(() => {
    // Solo se ejecuta en el cliente
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev === labImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? labImages.length - 1 : prev - 1
    );
  };

  // Función helper para oscurecer un color
  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) - amt,
          G = (num >> 8 & 0x00FF) - amt,
          B = (num & 0x0000FF) - amt;
    return "#" + (
      0x1000000 + 
      (R < 0 ? 0 : R) * 0x10000 + 
      (G < 0 ? 0 : G) * 0x100 + 
      (B < 0 ? 0 : B)
    ).toString(16).slice(1);
  };

  const firstImageIndex = currentSlide;
  const secondImageIndex = (currentSlide + 1) % labImages.length;

  const firstImage = labImages[firstImageIndex];
  const secondImage = labImages[secondImageIndex];

  // Estilos inline para los botones
  const buttonStyle = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: buttonColor,
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    margin: '0 0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontSize: '1.25rem'
  };

  const navContainerStyle = {
    display: 'flex',
    marginTop: '1.5rem',
    position: 'relative',
    zIndex: 10
  };

  return (
    <div className="lab-slider-container">
      <h2 className="lab-slider-title">Laboratorios</h2>

      <div className="lab-slider-content">
        <div className="lab-slider-text" style={{ 
          borderLeft: isMobile ? `4px solid ${buttonColor}` : 'none',
          paddingLeft: isMobile ? '1rem' : '0'
        }}>
          <h3>Lorem ipsum dolor sit amet consectetur.</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eget mi quam sit turpis. Arcu pulvinar sit ut nibh ultricies risus enim. Est tellus
            pretium consequat erat. Fermentum integer augue lectus semper imperdiet justo commodo pharetra a. Odio aliquam metus vitae
            amet velit convallis.
          </p>

          <div style={navContainerStyle} className="lab-slider-navigation">
            <button 
              style={buttonStyle}
              onClick={prevSlide} 
              aria-label="Previous image"
              className="nav-button prev"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = darkenColor(buttonColor, 20);
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = buttonColor;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span>&#8592;</span>
            </button>
            <button 
              style={buttonStyle}
              onClick={nextSlide} 
              aria-label="Next image"
              className="nav-button next"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = darkenColor(buttonColor, 20);
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = buttonColor;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span>&#8594;</span>
            </button>
          </div>
        </div>

        <div className="lab-slider-images">
          <div className="image-container">
            <img src={firstImage.imageSrc} alt="Laboratory" className="lab-image" />
            <div className="image-label">{firstImage.label}</div>
          </div>

          {/* Second image only shows on desktop */}
          <div className="image-container desktop-only">
            <img src={secondImage.imageSrc} alt="Laboratory" className="lab-image" />
            <div className="image-label">{secondImage.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabSlider;