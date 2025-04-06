import NecessaryDocumentation from '@library/_institutional/sections/helpPage/sections/Internationalization/universitiesInternationalization'
import MoreDoubtsI from '@library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'


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