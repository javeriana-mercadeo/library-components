'use client'

import { useEffect } from 'react'
import { Container, Title } from '@/app/components'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const RedesSociales = () => {
  const elementName = info.id || 'socialMedia'
  const baseClass = 'socialMedia'

  // Configuración de enlaces sociales para doctorado
  const socialLinks = [
    {
      url: 'https://facebook.com/javerianaoficial',
      label: 'Facebook oficial Universidad Javeriana'
    },
    {
      url: 'https://youtube.com/@UniversidadJaveriana',
      label: 'Canal oficial YouTube Universidad Javeriana'
    },
    {
      url: 'https://instagram.com/javerianaoficial',
      label: 'Instagram oficial Universidad Javeriana'
    },
    {
      url: 'https://www.tiktok.com/@unijaveriana?is_from_webapp=1&sender_device=pc',
      label: 'Tik Tok oficial Universidad Javeriana'
    },
    {
      url: 'https://www.linkedin.com/school/pontificia-universidad-javeriana&ved',
      label: 'Tik Tok oficial Universidad Javeriana'
    }
  ]

  useEffect(() => {
    script()
  }, [])

  return (
    <>
      <Container>
        <div className={`${baseClass}_container`}>
          <div className={`${baseClass}_inner`}>
            <Title hierarchy='h3' isEditable={false} className={`${baseClass}_title`}>
              Síguenos en redes sociales
            </Title>
            <ul className={`${baseClass}_social-list`}>
              {socialLinks.map((link, index) => (
                <li key={index} className={`${baseClass}_item`}>
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.label}
                    className={`${baseClass}_link`}
                    data-social-link
                    data-social-url={link.url}>
                    <i className='ph-fill ph-link' data-social-icon></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export default RedesSociales
