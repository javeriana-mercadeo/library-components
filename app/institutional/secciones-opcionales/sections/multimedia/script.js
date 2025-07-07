export class ImageSliderLogic {
  constructor(component) {
    this.component = component
    
    // Datos para las slides
    this.slides = [
      {
        id: 1,
        type: 'video',
        videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp41',
        title: 'Video 1'
      },
      {
        id: 2,
        type: 'video',
        videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp44',
        title: 'Video 2'
      },
      {
        id: 3,
        type: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=xV8jjDRgSyM',
        title: 'YouTube Video'
      },
      {
        id: 4,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 1'
      },
      {
        id: 5,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 2'
      },
      {
        id: 6,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 3'
      }
    ]

    // Bind methods
    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
  }

  getYouTubeEmbedUrl(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('keydown', this.handleKeyDown)
    this.calculateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleKeyDown)

    if (this.component.scrollTimeout) {
      clearTimeout(this.component.scrollTimeout)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slidesPerView !== this.component.state.slidesPerView) {
      const maxIndex = this.slides.length - this.component.state.slidesPerView
      if (this.component.state.currentIndex > maxIndex) {
        this.component.setState({ currentIndex: maxIndex })
      }
    }
  }

  getSlidesPerView() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 992) {
        return 3
      } else if (window.innerWidth >= 576) {
        return 2
      } else {
        return 1
      }
    }
    return 3
  }

  calculateDimensions() {
    if (this.component.sliderWrapperRef.current) {
      const slideElements = this.component.sliderWrapperRef.current.querySelectorAll('.slide')
      if (slideElements.length > 0) {
        const slideWidth = slideElements[0].offsetWidth
        const computedStyle = window.getComputedStyle(this.component.sliderWrapperRef.current)
        const slideGap = parseInt(computedStyle.gap) || 15

        this.component.setState({ slideWidth, slideGap })
      }
    }
  }

  handleResize() {
    const slidesPerView = this.getSlidesPerView()
    this.component.setState({ slidesPerView }, () => {
      this.calculateDimensions()
    })
  }

  handleScroll() {
    if (this.component.scrollTimeout) {
      clearTimeout(this.component.scrollTimeout)
    }

    this.component.scrollTimeout = setTimeout(() => {
      if (this.component.sliderWrapperRef.current) {
        const { slideWidth, slideGap } = this.component.state
        const totalSlideWidth = slideWidth + slideGap
        const scrollPosition = this.component.sliderWrapperRef.current.scrollLeft

        const newIndex = Math.round(scrollPosition / totalSlideWidth)
        this.component.setState({ currentIndex: newIndex })
      }
    }, 150)
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.goToSlide(this.component.state.currentIndex - 1)
    } else if (e.key === 'ArrowRight') {
      this.goToSlide(this.component.state.currentIndex + 1)
    }
  }

  goToSlide(index) {
    const maxIndex = this.slides.length - this.component.state.slidesPerView
    const newIndex = Math.max(0, Math.min(index, maxIndex))

    this.component.setState({ currentIndex: newIndex })

    if (this.component.sliderWrapperRef.current) {
      const { slideWidth, slideGap } = this.component.state
      const scrollPosition = newIndex * (slideWidth + slideGap)

      this.component.sliderWrapperRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }
}