import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'
import RegistrationSteps from '@/library/_institutional/sections/helpPage/sections/registration/registrationSteps'

export default function page() {
  return (
    <>
      <RegistrationSteps />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}
