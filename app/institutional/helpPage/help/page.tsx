import ButtonReturn from '@library/_institutional/sections/helpPage/sections/buttonReturn'
import Help from '@library/_institutional/sections/helpPage/sections/help'
import HelpQuestions from '@library/_institutional/sections/helpPage/sections/helpQuestions'
import VideoHelp from '@library/_institutional/sections/helpPage/sections/videoHelp'

export default function page(){
  return (
  <>
  <ButtonReturn />

  <Help />

  <HelpQuestions />  

  <VideoHelp />
    </>
  )
}