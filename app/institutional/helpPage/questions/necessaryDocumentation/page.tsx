import NecessaryDocumentation from '@library/_institutional/sections/helpPage/sections/registration/necessaryDocumentation'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'

export default function page() {
  return (
    <>
      <NecessaryDocumentation />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}