import React from 'react';
import '../styles/multimedia.scss';

class CardSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      cards: props.cards || [],
      visibleCards: 1
    };
    this.timer = null;
    this.sliderRef = React.createRef();
  }

  componentDidMount() {

    this.updateVisibleCards();
    

    window.addEventListener('resize', this.updateVisibleCards);
    
   
    if (this.props.autoSlide) {
      this.startAutoSlide();
    }
  }

  componentWillUnmount() {

    this.stopAutoSlide();
    window.removeEventListener('resize', this.updateVisibleCards);
  }

  updateVisibleCards = () => {
    const windowWidth = window.innerWidth;
    let visibleCards = 1;

    // Determina cuántas cards mostrar según el ancho de la pantalla
    if (windowWidth >= 1200) {
      visibleCards = 4;
    } else if (windowWidth >= 992) {
      visibleCards = 3;
    } else if (windowWidth >= 768) {
      visibleCards = 2;
    }  else if (windowWidth <= 450) {
        visibleCards = 1;
    }

    this.setState({ visibleCards });

    if (this.state.currentIndex > this.state.cards.length - visibleCards) {
      this.setState({
        currentIndex: Math.max(0, this.state.cards.length - visibleCards)
      });
    }
  }

  startAutoSlide = () => {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.props.slideInterval || 5000);
  }

  stopAutoSlide = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  nextSlide = () => {
    const { currentIndex, cards, visibleCards } = this.state;
    const maxIndex = cards.length - visibleCards;
    
    this.setState({
      currentIndex: currentIndex >= maxIndex ? 0 : currentIndex + 1
    });
  }

  prevSlide = () => {
    const { currentIndex, cards, visibleCards } = this.state;
    const maxIndex = cards.length - visibleCards;
    
    this.setState({
      currentIndex: currentIndex <= 0 ? maxIndex : currentIndex - 1
    });
  }

  goToSlide = (index) => {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    const { currentIndex, cards, visibleCards } = this.state;
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    return (
      <div className="multimedia-section">
        <h1>Multimedia</h1>
        
        <div className="cards-slider-container" 
             ref={this.sliderRef}
             onMouseEnter={this.props.autoSlide ? this.stopAutoSlide : null}
             onMouseLeave={this.props.autoSlide ? this.startAutoSlide : null}>
          <div className="cards-slider-wrapper">
            <div className="cards-track" style={{
              transform: `translateX(-${(currentIndex * 100) / cards.length}%)`,
              gridTemplateColumns: `repeat(${cards.length}, calc(${100 / visibleCards}% - ${(visibleCards-1) * 10 / visibleCards}px))`
            }}>
              {cards.map((card, index) => (
                <div key={index} className="card">
                  <div className="card-header">
                    <div className="institution-info">
                      <div className="institution-logo">
                        <span>PU</span>
                      </div>
                      <div className="institution-name">
                        <div>{card.institution || "PUJ Javeriana"}</div>
                        <div className="faculty-name">{card.faculty || "Facultad de Ingeniería"}</div>
                      </div>
                    </div>
                    <div className="more-options">•••</div>
                  </div>
                  
                  <div className="card-content">
                    <img src={card.imageSrc} alt={card.imageAlt || "Imagen institucional"} />
                    {card.hasPlayButton && (
                      <div className="play-button">
                        <div className="play-icon"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <button className="action-button like">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                      </svg>
                    </button>
                    <button className="action-button comment">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/>
                      </svg>
                    </button>
                    <button className="action-button share">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {cards.length > visibleCards && (
            <>
              <button className="slider-control prev" onClick={this.prevSlide}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
                </svg>
              </button>
              <button className="slider-control next" onClick={this.nextSlide}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
                </svg>
              </button>
              
              <div className="slider-indicators">
                {[...Array(maxIndex + 1)].map((_, index) => (
                  <button 
                    key={index} 
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => this.goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    

    this.cards = [
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3", 
        imageAlt: "Edificio de la facultad de ingeniería",
        hasPlayButton: false
      },
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3",
        imageAlt: "Estudiante en laboratorio",
        hasPlayButton: true
      },
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3",
        imageAlt: "Estudiante leyendo libro",
        hasPlayButton: true
      },
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3",
        imageAlt: "Hall de la universidad",
        hasPlayButton: false
      },
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3",
        imageAlt: "Estudiante leyendo libro",
        hasPlayButton: true
      },
      {
        institution: "PUJ Javeriana",
        faculty: "Facultad de Ingeniería",
        imageSrc: "https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3",
        imageAlt: "Hall de la universidad",
        hasPlayButton: false
      }
    ];
  }

  render() {
    return (
      <div className="app">
        <CardSlider 
          cards={this.cards}
          autoSlide={true}
          slideInterval={5000}
        />
      </div>
    );
  }
}

export default App;