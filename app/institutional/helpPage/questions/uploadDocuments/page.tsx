import MoreDoubts from '@/library/_institutional/sections/helpPage/sections/registration/moreDoubts'
import UploadDocuments from '@/library/_institutional/sections/helpPage/sections/registration/uploadDocuments'

export default function page() {
  return (
    <>
      <UploadDocuments />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}
