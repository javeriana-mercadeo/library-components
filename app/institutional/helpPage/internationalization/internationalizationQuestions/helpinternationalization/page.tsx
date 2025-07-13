import Helpinternationalization from '@/library/_institutional/sections/helpPage/sections/internationalization/helpInternationalization'
import MoreDoubtsI from '@/library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'

export default function page() {
  return (
    <>
      <Helpinternationalization />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}