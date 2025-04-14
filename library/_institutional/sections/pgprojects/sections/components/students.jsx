import React from 'react'
import '../styles/students.scss'

class StudentSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
      students: [
        {
          name: 'Elena Ramírez',
          position: 'Chief Innovation Officer',
          company: 'Tesla',
          logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
          image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
        },
        {
          name: 'Ricardo Fernández',
          position: 'Vicepresidente de Estrategia Global',
          company: 'Google',
          logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
          image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-dos'
        },
        {
          name: 'Elena Ramírez',
          position: 'Chief Innovation Officer',
          company: 'Tesla',
          logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
          image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
        },
        {
          name: 'Ricardo Fernández',
          position: 'Vicepresidente de Estrategia Global',
          company: 'Google',
          logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
          image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3'
        },
        {
          name: 'Valeria López',
          position: 'Directora de Desarrollo de Negocios',
          company: 'Microsoft',
          logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/microsoft',
          image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-tres'
        }
      ]
    }
    this.autoSlideInterval = null
  }

  componentDidMount() {
    this.startAutoSlide()
  }

  componentWillUnmount() {
    this.stopAutoSlide()
  }

  startAutoSlide = () => {
    this.autoSlideInterval = setInterval(this.nextSlide, 5000)
  }

  stopAutoSlide = () => {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
    }
  }

  nextSlide = () => {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.state.students.length
    }))
  }

  prevSlide = () => {
    this.setState(prevState => ({
      currentSlide: prevState.currentSlide === 0 ? this.state.students.length - 1 : prevState.currentSlide - 1
    }))
  }

  goToSlide = index => {
    this.setState({
      currentSlide: index
    })
  }

  getSlideClass = index => {
    const { currentSlide, students } = this.state
    const totalSlides = students.length

    if (index === currentSlide) {
      return 'active'
    }

    const nextIndex = (currentSlide + 1) % totalSlides
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
    const nextNextIndex = (currentSlide + 2) % totalSlides
    const prevPrevIndex = (currentSlide - 2 + totalSlides) % totalSlides

    if (index === nextIndex) return 'next'
    if (index === prevIndex) return 'prev'
    if (index === nextNextIndex) return 'next-next'
    if (index === prevPrevIndex) return 'prev-prev'

    return ''
  }

  render() {
    const { students, currentSlide } = this.state

    return (
      <div className="slider-container" onMouseEnter={this.stopAutoSlide} onMouseLeave={this.startAutoSlide}>
        <h2 className="slider-title">Estudiantes</h2>

        <div className="slider-content">
          <button className="slider-arrow prev-arrow" onClick={this.prevSlide}>
            &lt;
          </button>

          <div className="slider-cards">
            {students.map((student, index) => (
              <div key={index} className={`student-card ${this.getSlideClass(index)}`}>
                <div className="student-image">
                  <img src={student.image} alt={student.name} />
                </div>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>{student.position}</p>
                  <img src={student.logo} alt={student.company} className="company-logo" />
                </div>
              </div>
            ))}
          </div>

          <button className="slider-arrow next-arrow" onClick={this.nextSlide}>
            &gt;
          </button>
        </div>

        <div className="slider-dots">
          {students.map((_, index) => (
            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => this.goToSlide(index)}></span>
          ))}
        </div>
      </div>
    )
  }
}

export default StudentSlider
