import LiferayDevBanner from '@library/components/liferay_dev_banner'

import './styles.scss'

export default function () {
  return (
    <LiferayDevBanner icon='ph ph-whatsapp-logo' variant='success'>
      <span id='whatsAppSelector'>WhatsApp institucional:</span>
    </LiferayDevBanner>
  )
}
