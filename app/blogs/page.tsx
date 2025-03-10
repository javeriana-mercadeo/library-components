import ViewComponent from '@components/viewCode/viewComponent'
import MeetingDirector from '@/library/pregrado/sections/meetingDirector'
import BlogHeader from '@library/_institutional/sections/blogHeader'
import BlogFeatured from '@library/_institutional/sections/blogFeatured'

export default function Blogs() {
  return (
    <>
      <ViewComponent path="pregrado/sections/meetingDirector">
        <MeetingDirector />
      </ViewComponent>

      <ViewComponent path="_institutional/sections/blogHeader">
        <BlogHeader />
      </ViewComponent>

      <ViewComponent path="_institutional/sections/blogFeatured">
        <BlogFeatured />
      </ViewComponent>
    </>
  )
}
