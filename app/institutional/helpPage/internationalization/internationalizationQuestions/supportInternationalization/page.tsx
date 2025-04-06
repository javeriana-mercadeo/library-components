import FinancingOptions from '@library/_institutional/sections/helpPage/sections/Internationalization/supportInternationalization'
import MoreDoubtsI from '@library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'


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