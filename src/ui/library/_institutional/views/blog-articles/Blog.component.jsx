import { useEffect } from 'react'
import Title from '@library/_institutional/components/contain/Title.jsx'
import Paragraph from '@library/_institutional/components/contain/Paragraph.jsx'
import Caption from '@library/_institutional/components/contain/Caption.jsx'
import ImageBackground from '@library/_institutional/components/contain/ImageBackground.jsx'
import BtnLink from '@library/_institutional/components/buttons/BtnLink.jsx'
import CardHorizontal from '@library/_institutional/components/cards/CardHorizontal.jsx'

import CardBlog from './components/CardBlog.jsx'
import blogArticlesScript from './blog.scripts.js'
import data from './data.component.json'
import background from './assets/background.png'
import newImg from './assets/blog3.webp'
import newImg2 from './assets/blog4.webp'
import './blog.style.scss'

const BlogArticles = () => {
  useEffect(() => {
    blogArticlesScript()
  }, [])

  return (
    <>
      <div className="meeting">
        <div className="meeting-container">
          <Caption>Resuelve tus dudas con el director del programa</Caption>
          <BtnLink>Agenda tu reunión ahora</BtnLink>
        </div>
      </div>
      <section className="blog">
        <article className="blog-header">
          <ImageBackground img={background} />
          <div className="blog-header-container">
            <div className="blog-header-content">
              <i className="ph ph-file-image"></i>
              <div className="divider" />
              <Title>Soy un título de la página principal de blogs</Title>
              <div className="divider" />
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias nulla corporis sint exercitationem expedita quod eum cumque
                blanditiis quia, culpa laboriosam porro fugiat nam rem nostrum in, accusantium a quaerat.
              </Paragraph>
            </div>
          </div>
        </article>

        <article className="blog-important">
          <div className="blog-important-container">
            <div className="blog-slider">
              <div className="blog-slider__wrp swiper-wrapper">
                <CardHorizontal
                  data={{
                    img: newImg,
                    altImg: '',
                    date: '01/08/2024',
                    title: 'Tecnología Revolucionaria de Energía Limpia',
                    author: 'John Hernández',
                    profession: 'Ingeniero de Energía'
                  }}>
                  Un equipo de ingenieros ha desarrollado una nueva tecnología que permite la generación de energía limpia a partir del
                  movimiento de las olas del mar. Esta innovación promete cambiar el panorama energético global.
                </CardHorizontal>

                <CardHorizontal
                  data={{
                    img: newImg2,
                    altImg: '',
                    date: '15/02/2025',
                    title: 'Avances en Inteligencia Artificial Médica',
                    author: 'Laura Martínez',
                    profession: 'Especialista en IA y Salud'
                  }}>
                  Investigadores han desarrollado un nuevo algoritmo de inteligencia artificial capaz de diagnosticar enfermedades raras con
                  una precisión sin precedentes, reduciendo los tiempos de detección y mejorando los tratamientos.
                </CardHorizontal>
              </div>
              <div className="blog-slider__pagination"></div>
            </div>
          </div>
        </article>

        <div className="blog-content card position-relative overflow-hidden">
          <div className="shop-part d-flex w-100">
            <div className="shop-filters flex-shrink-0 border-end d-none d-lg-block">
              <ul className="list-group pt-2 border-bottom rounded-0">
                <h6 className="my-3 mx-4 fw-semibold">Filtros por categoría</h6>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-circles fs-5"></i>Todos
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-hanger fs-5"></i>Facultades
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-notebook fs-5"></i>Publicaciones Académicas
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-mood-smile fs-5"></i>Investigaciones
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-device-laptop fs-5"></i>Tesis y Trabajos de Grado
                  </a>
                </li>
              </ul>
              <ul className="list-group pt-2 border-bottom rounded-0">
                <h6 className="my-3 mx-4 fw-semibold">Ordenar por</h6>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-ad-2 fs-5"></i> Todas
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-sort-ascending-2 fs-5"></i>Artículos en revistas indexadas
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-sort-descending-2 fs-5"></i>Ponencias en congresos
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-2 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)">
                    <i className="ti ti-ad-2 fs-5"></i>Libros y capítulos de libros
                  </a>
                </li>
              </ul>
              <div className="by-gender border-bottom rounded-0">
                <h6 className="mt-4 mb-3 mx-4 fw-semibold">Por Nivel Académico</h6>
                <div className="pb-4 px-4">
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios1">
                      Todos
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios2" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios2">
                      Pregrado
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios3" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios3">
                      Maestría
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios4" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios4">
                      Doctorado
                    </label>
                  </div>
                </div>
              </div>
              <div className="by-pricing border-bottom rounded-0">
                <h6 className="mt-4 mb-3 mx-4 fw-semibold">Por Facultad</h6>
                <div className="pb-4 px-4">
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios5" value="option1" checked />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios5">
                      Todas
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios6" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios6">
                      Ciencias Sociales
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios7" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios7">
                      Ingeniería
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios8" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios8">
                      Medicina
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios9" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios9">
                      Ciencias Económicas y Administrativas
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input className="form-check-input p-2" type="radio" name="exampleRadios" id="exampleRadios9" value="option1" />
                    <label className="form-check-label d-flex align-items-center ps-2" htmlFor="exampleRadios9">
                      Ciencias Jurídicas
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <a href="javascript:void(0)" className="btn btn-primary w-100">
                  Reset Filters
                </a>
              </div>
            </div>

            <div className="card-body p-4 pb-0">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <a
                  className="btn btn-primary d-lg-none d-flex"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample">
                  <i className="ti ti-menu-2 fs-6"></i>
                </a>
                <h5 className="fs-5 fw-semibold mb-0 d-none d-lg-block">Products</h5>
                <form className="position-relative">
                  <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Product" />
                  <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                </form>
              </div>
              <div className="row">
                <div className="blog_container">
                  {data.map(data => (
                    <CardBlog key={data.id} data={data} />
                  ))}
                </div>
              </div>

              <nav aria-label="...">
                <ul className="pagination justify-content-center mb-0 mt-4 pb-3">
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 d-flex align-items-center justify-content-center"
                      href="#">
                      <i className="ti ti-chevron-left"></i>
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a
                      className="page-link border-0 rounded-circle round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      5
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
                      href="#">
                      10
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded-circle text-dark round-32 d-flex align-items-center justify-content-center"
                      href="#">
                      <i className="ti ti-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogArticles
