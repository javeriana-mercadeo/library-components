import AgreementsInternationalization
  from '@/library/_institutional/sections/helpPage/sections/internationalization/agreementsInternationalization'
import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'

export default function page() {
  return (
    <>
      <AgreementsInternationalization />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}