import WhenHelp from '@library/_institutional/sections/helpPage/sections/registration/whenHelp'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'

export default function page() {
  return (
    <>
      <WhenHelp />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}