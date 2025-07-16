import { useEffect } from 'react'
import PopupContainer from '@/app/_components/popup/components/Popup-container.jsx'
import Content from '@/app/_components/popup/components/Content.jsx'
import TriggerBtn from '@/app/_components/popup/components/Trigger-btn'
import script from './script.js'
// import './popup.scss'

const Popup = () => {
  useEffect(() => {
    script()
  }, [])
  return (
    <>
      <TriggerBtn></TriggerBtn>
      <PopupContainer id="popup" >
        <Content></Content>
      </PopupContainer>
    </>
  )
}

export default Popup
