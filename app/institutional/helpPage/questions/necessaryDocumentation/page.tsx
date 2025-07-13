import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'
import NecessaryDocumentation from '@/library/_institutional/sections/helpPage/sections/registration/necessaryDocumentation'

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