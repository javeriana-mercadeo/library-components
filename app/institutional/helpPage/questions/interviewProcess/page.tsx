import InterviewProcess from '@/library/_institutional/sections/helpPage/sections/registration/interviewProcess'
import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'

export default function page() {
  return (
    <>
      <InterviewProcess />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}