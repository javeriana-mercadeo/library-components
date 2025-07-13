import DataHelp from '@/library/_institutional/sections/helpPage/sections/registration/dataHelp'
import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'

export default function page() {
  return (
    <>
      <DataHelp />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}