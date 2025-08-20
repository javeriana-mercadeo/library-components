'use client'

import { Container, Title } from '@library/components'

import info from './info.json'
import './styles.scss'

const RedesSociales = () => {
  const elementName = info.id || 'socialMedia'
  const baseClass = 'socialMedia'

  return (
    <>
      <Container>
        <div className={`${baseClass}_container`}>
          <div className={`${baseClass}_inner`}>
            <Title hierarchy='h3' isEditable={false} className={`${baseClass}_title`}>
              Redes sociales de la facultad
            </Title>
            <ul className={`${baseClass}_social-list`}>
              <li>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Facebook de la Facultad de Ciencias Sociales'
                  className={`${baseClass}_link ${baseClass}_facebook`}>
                  <i className='ph-fill ph-facebook-logo'></i>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='YouTube de la Facultad de Ciencias Sociales'
                  className={`${baseClass}_link ${baseClass}_youtube`}>
                  <i className='ph-fill ph-youtube-logo'></i>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Instagram de la Facultad de Ciencias Sociales'
                  className={`${baseClass}_link ${baseClass}_instagram`}>
                  <i className='ph-fill ph-instagram-logo'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export default RedesSociales
