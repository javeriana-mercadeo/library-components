'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const FooterExpo = () => {
  const elementName = info.id || 'footer-expo'
  const baseClass = 'footer-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      <footer className={`${baseClass}__container`}>
        <div className={`${baseClass}__content`}>
          <h2 className={`${baseClass}__title`} data-lfr-editable-id='footer-expo-prg-title' data-lfr-editable-type='text'>
            ¡Descubre lo mejor de la Javeriana! ¡Te esperamos para vivir juntos esta experiencia única!
          </h2>
          <hr className={`${baseClass}__divider`} />

          <div className={`${baseClass}__icons-wrapper`}>
            <div className={`${baseClass}__contact-item`}>
              <i className={`ph ph-phone ${baseClass}__icon`}></i>
              <p data-lfr-editable-id='footer-expo-prg-phone-text' data-lfr-editable-type='text'>
                +57 (601) 320 8320 Opción 3
              </p>
            </div>

            <div className={`${baseClass}__contact-item`}>
              <i className={`ph ph-whatsapp-logo ${baseClass}__icon`}></i>
              <a
                href='https://api.whatsapp.com/send?phone=573164718453&utm_source=DIGITAL&utm_medium=SEO&utm_campaign=Expojaveriana_Home'
                target='_blank'
                rel='noopener noreferrer'
                data-lfr-editable-id='footer-expo-prg-whatsapp-link'
                data-lfr-editable-type='link'>
                <p data-lfr-editable-id='footer-expo-prg-whatsapp-text' data-lfr-editable-type='text'>
                  +57 3164718453
                </p>
              </a>
            </div>

            <div className={`${baseClass}__contact-item`}>
              <i className={`ph ph-envelope-simple ${baseClass}__icon`}></i>
              <p data-lfr-editable-id='footer-expo-prg-email-text' data-lfr-editable-type='text'>
                expojaveriana@javeriana.edu.co
              </p>
            </div>

            <div className={`${baseClass}__social-media`}>
              <a
                href='https://www.facebook.com/ViveJaveriana'
                target='_blank'
                rel='noopener noreferrer'
                data-lfr-editable-id='footer-expo-prg-facebook-link'
                data-lfr-editable-type='link'>
                <i className={`ph ph-facebook-logo ${baseClass}__social-icon`}></i>
              </a>
              <a
                href='https://www.instagram.com/vivejaveriana/?igshid=YmMyMTA2M2Y%3D'
                target='_blank'
                rel='noopener noreferrer'
                data-lfr-editable-id='footer-expo-prg-instagram-link'
                data-lfr-editable-type='link'>
                <i className={`ph ph-instagram-logo ${baseClass}__social-icon`}></i>
              </a>
              <a
                href='https://www.linkedin.com/school/pontificia-universidad-javeriana'
                target='_blank'
                rel='noopener noreferrer'
                data-lfr-editable-id='footer-expo-prg-linkedin-link'
                data-lfr-editable-type='link'>
                <i className={`ph ph-linkedin-logo ${baseClass}__social-icon`}></i>
              </a>
              <a
                href='https://www.tiktok.com/@unijaveriana'
                target='_blank'
                rel='noopener noreferrer'
                data-lfr-editable-id='footer-expo-prg-tiktok-link'
                data-lfr-editable-type='link'>
                <i className={`ph ph-tiktok-logo ${baseClass}__social-icon`}></i>
              </a>
            </div>
          </div>

          <p className={`${baseClass}__legal-text`} data-lfr-editable-id='footer-expo-prg-legal-text' data-lfr-editable-type='text'>
            Pontificia Universidad Javeriana - Bogotá D.C. - Colombia. Sujeta a inspección y vigilancia por parte del Ministerio de
            Educación Nacional (artículo 39 del decreto 1295 de 2010)
          </p>

          <p className={`${baseClass}__vigilance-text`} data-lfr-editable-id='footer-expo-prg-vigilance-text' data-lfr-editable-type='text'>
            | VIGILADA MINEDUCACIÓN |
          </p>
        </div>
      </footer>
    </div>
  )
}

export default FooterExpo
