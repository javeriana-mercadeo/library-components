import FinancingQuestionFrequently
  from '@/library/_institutional/sections/helpPage/sections/Internationalization/internationalizationQuestionFrequently'
import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'
import ButtonReturn from '@/library/_institutional/sections/helpPage/sections/registration/buttonReturn'

export default function Page() {
  return (
    <>
      <div className="only-mobile">
        <ButtonReturn />
      </div>

      <FinancingQuestionFrequently />
      <div className="only-mobile">
        <MoreDoubtsI />
      </div>
    </>
  )
}
