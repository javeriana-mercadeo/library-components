import React from 'react'

import Title from '@library/components/contain/title'
import Container from '@library/components/container'
import { studentsData, getNextSlide, getPrevSlide, getSlideClass } from './script.js'

import './styles.scss'

class StudentSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
      students: studentsData
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
      currentSlide: getNextSlide(prevState.currentSlide, this.state.students.length)
    }))
  }

  prevSlide = () => {
    this.setState(prevState => ({
      currentSlide: getPrevSlide(prevState.currentSlide, this.state.students.length)
    }))
  }

  goToSlide = index => {
    this.setState({
      currentSlide: index
    })
  }

  getSlideClassForIndex = index => {
    return getSlideClass(index, this.state.currentSlide, this.state.students.length)
  }

  render() {
    const { students, currentSlide } = this.state

    return (
      <Container className="slider-container">
        <div onMouseEnter={this.stopAutoSlide} onMouseLeave={this.startAutoSlide}>
          <Title className="slider-title">
            Estudiantes
          </Title>

          <div className="slider-content">
            <div className="carousel-controls">
              <button className="carousel-control prev" onClick={this.prevSlide}>
                <i className="ph ph-arrow-circle-left"></i>
              </button>
              <button className="carousel-control next" onClick={this.nextSlide}>
                <i className="ph ph-arrow-circle-right"></i>
              </button>
            </div>

            <div className="slider-cards">
              {students.map((student, index) => (
                <div key={index} className={`student-card ${this.getSlideClassForIndex(index)}`}>
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
          </div>

          <div className="slider-dots">
            {students.map((_, index) => (
              <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => this.goToSlide(index)}></span>
            ))}
          </div>
        </div>
      </Container>
    )
  }
}

export default StudentSlider
