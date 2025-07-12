import LiferayDevBanner from '@library/components/liferay_dev_banner'

import './styles.scss'

export default function StateProgram() {
  return (
    <LiferayDevBanner icon="ph ph-info" variant="info">
      <span id="stateProgramLabel">Estado general del programa: MODO PRODUCCIÓN</span>
    </LiferayDevBanner>
  )
}
