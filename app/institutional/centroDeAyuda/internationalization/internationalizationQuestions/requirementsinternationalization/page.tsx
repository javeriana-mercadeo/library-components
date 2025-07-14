import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'
import FinancingOptions from '@/library/_institutional/sections/helpPage/sections/internationalization/requirementsInternationalization'

export default function page() {
  return (
    <>
      <FinancingOptions />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}