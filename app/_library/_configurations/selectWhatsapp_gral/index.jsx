'use client'

import { useEffect } from 'react'
import LiferayDevBanner from '@library/components/liferay_dev_banner'

import './styles.scss'

export default function SelectWhatsappGral() {
  useEffect(() => {
    // Solo para testing en Next.js - en Liferay el script se ejecuta automáticamente
    if (typeof window !== 'undefined' && !window.selectWhatsappGralLoaded) {
      window.selectWhatsappGralLoaded = true
      // Crear objeto mock de configuration para testing
      if (typeof window.configuration === 'undefined') {
        window.configuration = {
          whatsAppAcademicLevel: 'pre',
          applyImmediate: false,
          enableDebugLogs: true
        }
      }
      console.log('🧪 [DEV] Simulando carga del script para Next.js')
    }
  }, [])

  return (
    <LiferayDevBanner icon='ph ph-whatsapp-logo' variant='success'>
      <span id='whatsAppSelector'>WhatsApp institucional:</span>
    </LiferayDevBanner>
  )
}
