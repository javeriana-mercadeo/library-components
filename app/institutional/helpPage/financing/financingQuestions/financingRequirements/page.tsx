import FinancingRequirements from '@library/_institutional/sections/helpPage/sections/financing/financingRequirements'
import MoreDoubtsF from '@library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'

export default function page() {
  return (
    <>
      <FinancingRequirements />
      <div className="only-desktop">
        <MoreDoubtsF />
      </div>
    </>
  )
}