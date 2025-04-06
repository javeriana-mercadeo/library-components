import ButtonReturn from '@library/_institutional/sections/helpPage/sections/registration/buttonReturn'
import FinancingQuestionFrequently from '@/library/_institutional/sections/helpPage/sections/financing/financingQuestionFrequently'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'
export default function Page() {
  return (
    <>
          <div className="only-mobile">
        <ButtonReturn />
      </div>
      <FinancingQuestionFrequently />
      <div className="only-mobile">
        <MoreDoubts />
      </div>
    </>
  )
}
