import ApplicationFinancing from '@/library/_institutional/sections/helpPage/sections/financing/applicationFinancing'
import MoreDoubtsF from '@/library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'

export default function page() {
  return (
    <>
      <ApplicationFinancing />
      <div className="only-desktop">
        <MoreDoubtsF />
      </div>
    </>
  )
}