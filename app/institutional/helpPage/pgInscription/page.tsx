import ButtonReturn from '@library/_institutional/sections/helpPage/sections/buttonReturn'
import PgInscription from '@library/_institutional/sections/helpPage/sections/pgInscription-I'
import VideoHelp from '@library/_institutional/sections/helpPage/sections/videoHelp'
import QuestionFrequently from '@library/_institutional/sections/helpPage/sections/questionFrequently'

export default function page(){
  return (
  <> <QuestionFrequently />
  <ButtonReturn />
  
  <PgInscription />

  <VideoHelp />

 
    </>
  )
}