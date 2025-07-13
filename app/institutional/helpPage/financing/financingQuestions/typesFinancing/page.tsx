import MoreDoubtsF from '@/library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'
import NecessaryDocumentation from '@/library/_institutional/sections/helpPage/sections/financing/typesFinancing'

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