import ButtonReturn from '@library/_institutional/sections/helpPage/sections/buttonReturn'
import PgInscription from '@library/_institutional/sections/helpPage/sections/pgInscription-I'
import HelpQuestions from '@library/_institutional/sections/helpPage/sections/helpQuestions'
import VideoHelp from '@library/_institutional/sections/helpPage/sections/videoHelp'


export default function page(){
  return (
  <>
  <ButtonReturn />
  
  <PgInscription />

  <HelpQuestions />  

  <VideoHelp />
    </>
  )
}