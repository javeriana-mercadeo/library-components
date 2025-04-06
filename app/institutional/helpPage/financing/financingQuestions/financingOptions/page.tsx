import FinancingOptions from '@library/_institutional/sections/helpPage/sections/financing/financingOptions'
import MoreDoubtsF from '@library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'

export default function page() {
  return (
    <>
      <FinancingOptions />
      <div className="only-desktop">
        <MoreDoubtsF />
      </div>
    </>
  )
}