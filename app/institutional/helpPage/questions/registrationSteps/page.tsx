import RegistrationSteps from '@library/_institutional/sections/helpPage/sections/registration/registrationSteps'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'

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
