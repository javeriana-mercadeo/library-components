'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import ButtonReturn from '@/library/_institutional/sections/helpPage/sections/registration/buttonReturn'
import Help from '@/app/institutional/helpPage/sections/help'
import HelpQuestions from '@/library/_institutional/sections/helpPage/sections/registration/helpQuestions'
import VideoHelp from '@/library/_institutional/sections/helpPage/sections/registration/videoHelp'

export default function page() {
  const basePath = '/institutional/helpPage'
  return (
    <>
      <ButtonReturn />

      {/* <Help /> */}
      <ViewComponent path={`${basePath}sections/help`}>
        <Help />
      </ViewComponent>

      {/* <HelpQuestions />  */}
      <ViewComponent path={`${basePath}/registration/helpQuestions`}>
        <HelpQuestions />
      </ViewComponent>

      <VideoHelp />
    </>
  )
}
