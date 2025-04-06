import RequirementsHelp from '@library/_institutional/sections/helpPage/sections/registration/requirementsHelp'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'

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
