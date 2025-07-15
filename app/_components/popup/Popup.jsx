import { useEffect } from 'react'
import PopupContainer from '@/app/_components/popup/components/Popup-container.jsx'
import Content from '@/app/_components/popup/components/Content.jsx'
import TriggerBtn from '@/app/_components/popup/components/Trigger-btn'
// import './popup.scss'

const Popup = () => {
  useEffect(() => {
    import('./script.js')
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
