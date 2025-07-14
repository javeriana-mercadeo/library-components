import InternationalizationQuestionFrequently
  from '@/library/_institutional/sections/helpPage/sections/Internationalization/internationalizationQuestionFrequently'
import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'

export default function page() {
  return (
    <>
      <InternationalizationQuestionFrequently />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}
