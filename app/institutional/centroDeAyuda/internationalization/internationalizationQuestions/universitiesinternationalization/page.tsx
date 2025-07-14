import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'
import NecessaryDocumentation
  from '@/library/_institutional/sections/helpPage/sections/internationalization/universitiesInternationalization'

export default function page() {
  return (
    <>
      <NecessaryDocumentation />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}