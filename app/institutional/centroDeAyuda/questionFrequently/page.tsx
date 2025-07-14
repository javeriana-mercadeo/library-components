import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'
import QuestionFrequently from '@/library/_institutional/sections/helpPage/sections/registration/questionFrequently'

export default function Page() {
   const basePath = 'main/library/_institutional/sections/helpPage/sections'
  return (
    <>
      

      <QuestionFrequently />
<div className="only-mobile">
  <ViewComponent path={`${basePath}/registration/help`}>
  <MoreDoubts />
  </ViewComponent>
 
</div>
      
    </>
  )
}
