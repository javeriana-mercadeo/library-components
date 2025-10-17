import LiferayDevBanner from '@/app/common/liferayDevBanner'

import './styles.scss'

export default function () {
  return (
    <LiferayDevBanner icon='ph ph-info' variant='info'>
      <span id='themeSelector'>Tema seleccionado:</span>
    </LiferayDevBanner>
  )
}
