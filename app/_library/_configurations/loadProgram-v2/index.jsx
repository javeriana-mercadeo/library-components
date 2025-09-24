import LiferayDevBanner from '@library/components/liferay_dev_banner'

import './styles.scss'

export default function () {
  return (
    <LiferayDevBanner icon='ph ph-info' variant='info'>
      <span id='code-program-configuration'>Código de programa:</span>
    </LiferayDevBanner>
  )
}
