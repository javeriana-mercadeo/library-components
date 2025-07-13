import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'
import RequirementsHelp from '@/library/_institutional/sections/helpPage/sections/registration/requirementsHelp'

export default function page() {
  return (
    <>
      <RequirementsHelp />

      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}
