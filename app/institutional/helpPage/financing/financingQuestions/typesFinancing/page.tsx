import NecessaryDocumentation from '@library/_institutional/sections/helpPage/sections/financing/typesFinancing'
import MoreDoubtsF from '@library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'

export default function page() {
  return (
    <>
      <NecessaryDocumentation />
      <div className="only-desktop">
        <MoreDoubtsF />
      </div>
    </>
  )
}