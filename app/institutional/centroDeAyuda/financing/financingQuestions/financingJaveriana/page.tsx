import FinancingJaveriana from '@/library/_institutional/sections/helpPage/sections/financing/financingJaveriana'
import MoreDoubtsF from '@/library/_institutional/sections/helpPage/sections/financing/moreDoubtsf'

export default function page() {
  return (
    <>
      <FinancingJaveriana />
      <div className="only-desktop">
        <MoreDoubtsF />
      </div>
    </>
  )
}