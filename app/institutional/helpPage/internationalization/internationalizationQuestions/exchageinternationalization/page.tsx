import Exchageinternationalization from '@library/_institutional/sections/helpPage/sections/internationalization/exchangeInternationalization'
import MoreDoubtsI from '@library/_institutional/sections/helpPage/sections/internationalization/moreDoubtsI'

export default function page() {
  return (
    <>
      <Exchageinternationalization />
      <div className="only-desktop">
        <MoreDoubtsI />
      </div>
    </>
  )
}