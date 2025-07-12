'use client'
import { useEffect } from 'react'

import PopupContainer from './components/Popup-container'
import Content from './components/Content'
import TriggerBtn from './components/Trigger-btn'

const Popup = () => {
  useEffect(() => {
    import('./script.js')
  }, [])

  return (
    <>
      <TriggerBtn />
      <PopupContainer id="popup">
        <Content />
      </PopupContainer>
    </>
  )
}

export default Popup
